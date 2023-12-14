import React, { useEffect, useState } from "react";
import Button from "../../components/elements/Button";
import ModalWrapper from "../../components/wrappers/ModalWrapper";
import Form from "../../components/elements/Form";
import CardJob from "../../components/elements/CardJob";
import { Delete, get } from "../../utils/functions";
import ErrorModal from "../../components/Modals/ErrorModal";
import SuccessModal from "../../components/Modals/SuccessModal";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [updateComponent, setupdateComponent] = useState(false);
  const [isEditable, setisEditable] = useState(false);
  const [response, setResponse] = useState([]);
  // loader state
  const [loader, setloader] = useState(false);
  // error modal state
  const [errorModal, seterrorModal] = useState({
    title: "",
    message: "",
    id: "",
    modal: false,
  });
  // success modal state
  const [sucessModal, setsucessModal] = useState({
    title: "",
    message: "",
    modal: false,
  });
  // form data
  const [formData, setformData] = useState({
    jobtitle: "",
    companyName: "",
    industry: "",
    location: "",
    remoteType: "",
    Eminimum: "",
    Emaximum: "",
    Smaximum: "",
    Sminimum: "",
    totalEmp: "",
    applyType: "",
  });

  // open form modal
  function OpenModal() {
    setToggleModal(true);
  }

  useEffect(() => {
    setloader(true);
    getResponse();
    return () => {
      setResponse([]);
      setupdateComponent(false);
    };
  }, [updateComponent]);

  // get response from api
  async function getResponse() {
    const data = await get({
      url: "/jobs",
    });

    if (data?.response) {
      setResponse(data.response); // set response to state and send it to job card to display data
      setloader(false);
      setisEditable(false);
    }
  }

  function ApplyButton() {}

  // edit created job card data
  async function EditIconClick(data) {
    OpenModal();
    console.log(data);
    setisEditable(true);
    setformData({
      id: data?.id,
      applyType: data?.applyType,
      companyName: data?.companyName,
      Emaximum: data?.Experience?.split("-")[1],
      Eminimum: data?.Experience?.split("-")[0],
      industry: data?.industry,
      jobtitle: data?.title,
      location: data?.location,
      remoteType: data?.remoteType,
      Smaximum: data?.Salary?.split("-")[1],
      Sminimum: data?.Salary?.split("-")[0],
      totalEmp: data?.numberOfEmployee,
    });
  }

  // delete job card when clicked on  red delete icon on job card
  async function DeleteIconClick() {
    if (errorModal.id) {
      const data = await Delete({ param: errorModal.id, url: "/jobs" });

      if (data.response) {
        seterrorModal({ id: "", title: "", modal: false, message: "" });
        setupdateComponent(!updateComponent);

        // display sucess modal after job has been deleted
        setsucessModal({
          title: "Job Deleted!",
          modal: true,
          message: "Your Job has been successfully deleted. ",
        });
      }
    }
  }

  return (
    <div>
      <div>
        {/* button for opening job form modal  */}
        <Button onClick={OpenModal} varient={"fill"} text={"Create a Job"} />
      </div>
      <div className="flex justify-center items-center my-4">
        {loader && <Loader />}
      </div>
      {!loader && !response.length && (
        <div className="flex justify-center uppercase items-center my-4">
          No jobs found
        </div>
      )}
      <div className="p-2 flex justify-start items-center flex-wrap">
        {response.map((data, index) => {
          return (
            // this is job card
            <CardJob
              key={index}
              data={data}
              onClick={ApplyButton}
              onDelete={() =>
                seterrorModal({
                  title: "Delete Modal",
                  message: "Are you sure want to delete this job?",
                  id: data?.id,
                  modal: true,
                })
              }
              onEdit={() => EditIconClick(data)}
            />
          );
        })}
      </div>
      {/* display create jon form modal */}
      <ModalWrapper closeModal={() => setToggleModal(false)} open={toggleModal}>
        <Form
          setToggleModal={setToggleModal}
          setsuccessModal={setsucessModal}
          setupdateComponent={setupdateComponent}
          updateComponent={updateComponent}
          value={formData}
          isEditable={isEditable}
          seterrorModal={seterrorModal}
        />
      </ModalWrapper>
      {/* display error modal */}
      <ModalWrapper open={errorModal.modal} hideCloseButtom={true}>
        <ErrorModal
          message={errorModal.message}
          title={errorModal.title}
          ButtonOneClick={DeleteIconClick}
          ButtonTwoClick={() => seterrorModal({ ...errorModal, modal: false })}
        />
      </ModalWrapper>
      {/* display success modal */}
      <ModalWrapper open={sucessModal.modal} hideCloseButtom={true}>
        <SuccessModal
          message={sucessModal.message}
          title={sucessModal.title}
          ButtonClick={() => {
            setsucessModal({ title: "", message: "", modal: false });
          }}
        />
      </ModalWrapper>
    </div>
  );
};

export default Home;
