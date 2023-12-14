import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import CardWrappers from "../wrappers/CardWrappers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { post, put } from "../../utils/functions";
import ModalWrapper from "../wrappers/ModalWrapper";
import ErrorModal from "../Modals/ErrorModal";

let stepOneCompleted = false;

const Form = ({
  setToggleModal,
  setsuccessModal,
  setupdateComponent,
  updateComponent,
  value,
  isEditable,
}) => {
  const stepOne = useRef(null);
  const stepTwo = useRef(null);
  const [errorModal, seterrorModal] = useState({
    title: "",
    message: "",
    id: "",
    modal: false,
  });
  const ChangeFormCallback = useCallback(ChangeForm, []);

  function ChangeForm() {
    if (stepOneCompleted) {
      if (stepOne?.current && stepTwo?.current) {
        stepOne.current.style.transform = "translateX(0%)";
        stepTwo.current.style.transform = "translateX(0%)";
        stepOneCompleted = false;
      }
    } else {
      if (stepOne?.current && stepTwo?.current) {
        stepOne.current.style.transform = "translateX(100%)";
        stepTwo.current.style.transform = "translateX(-100%)";
        stepOneCompleted = true;
      }
    }
  }

  useEffect(() => {
    if (value) {
      formHandle.setValues(value);
    }
    debugger;
  }, [value]);

  const formHandle = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object().shape({
      jobtitle: Yup.string().required("Job title can not be empty"),
      companyName: Yup.string().required("Company name can not be empty"),
      industry: Yup.string().required("Industry can not be empty"),
      location: Yup.string(),
      remoteType: Yup.string(),
      Eminimum: Yup.number(),
      Emaximum: Yup.number(),
      Smaximum: Yup.number(),
      Sminimum: Yup.number(),
      totalEmp: Yup.string(),
      applyType: Yup.string(),
    }),
    onSubmit: (values) => {
      if (stepOneCompleted) {
        ApiPostCall(values);
      } else {
        ChangeFormCallback(values);
      }
    },
  });

  const ApiPostCall = async (values) => {
    const {
      jobtitle,
      companyName,
      industry,
      location,
      remoteType,
      Eminimum,
      Emaximum,
      Smaximum,
      Sminimum,
      totalEmp,
      applyType,
    } = values;

    if (!applyType) {
      formHandle.setFieldError("applyType", " Apply type can not be empty");
      return;
    }

    if (Eminimum > Emaximum) {
      formHandle.setFieldError(
        "Eminimum",
        "value must smaller than maximum value"
      );

      return;
    }

    if (Smaximum < Sminimum) {
      formHandle.setFieldError(
        "Sminimum",
        "value must smaller than maximum value"
      );
      return;
    }

    const requestBody = {
      title: jobtitle,
      location,
      industry,
      Experience: Eminimum + "-" + Emaximum,
      Salary: Sminimum + "-" + Smaximum,
      numberOfEmployee: totalEmp,
      applyType,
      remoteType,
      companyName,
    };

    let data = "";

    if (isEditable) {
      data = await put({
        url: "/jobs",
        param: value?.id,
        data: { ...requestBody, id: value?.id },
      });
    } else {
      data = await post({ url: "/jobs", data: requestBody });
    }
    debugger;
    if (data?.response) {
      setToggleModal(false);
      setupdateComponent(!updateComponent);
      ChangeForm();
      formHandle.resetForm();
      setsuccessModal({
        title: "Job Created",
        message:
          "Your Job has been successfully created. You're able modify or delete your job at any time.",
        modal: true,
      });
    } else if (data?.message) {
      seterrorModal({
        message: data?.message,
        title: "Oops!",
        modal: true,
      });
    }
  };

  return (
    <CardWrappers
      className={
        "font-poppins w-[577px] border rounded-[10px] shadow-md bg-white text-left border-gray"
      }
    >
      <div className="flex overflow-hidden">
        {/* step 1 */}
        <div
          ref={stepOne}
          className="flex min-w-full max-w-full flex-col gap-24 p-8 transition-all"
        >
          <div className="flex flex-col gap-6 min-w-full w-full">
            <div className="flex justify-between items-center">
              <div className="text-[20px]">Create a job</div>
              <div className="text-base">Step 1</div>
            </div>
            <Input
              required
              id={"jobTitle"}
              placeholder={"ex. UX UI Designer"}
              value={formHandle.values.jobtitle}
              InputBlur={formHandle.handleBlur}
              InputChange={formHandle.handleChange}
              name={"jobtitle"}
              label={"Job title"}
              isError={
                formHandle.errors.jobtitle && formHandle.touched.jobtitle
              }
              error={formHandle.errors.jobtitle}
            />
            <Input
              required
              id={"companyName"}
              placeholder={"ex. Google"}
              value={formHandle.values.companyName}
              InputBlur={formHandle.handleBlur}
              InputChange={formHandle.handleChange}
              isError={
                formHandle.errors.companyName && formHandle.touched.companyName
              }
              error={formHandle.errors.companyName}
              name={"companyName"}
              label={"Company name"}
            />
            <Input
              required
              id={"industry"}
              placeholder={"ex. Information Technology"}
              value={formHandle.values.industry}
              InputBlur={formHandle.handleBlur}
              InputChange={formHandle.handleChange}
              name={"industry"}
              isError={
                formHandle.errors.industry && formHandle.touched.industry
              }
              error={formHandle.errors.industry}
              label={"Industry"}
            />
            <div className="flex justify-between items-center">
              <Input
                name={"location"}
                value={formHandle.values.location}
                id={"Location"}
                placeholder={"ex. Chennai"}
                InputChange={formHandle.handleChange}
                InputBlur={formHandle.handleBlur}
                label={"Location"}
              />
              <Input
                name={"remoteType"}
                id={"remotetype"}
                value={formHandle.values.remoteType}
                placeholder={"ex. In-office"}
                InputBlur={formHandle.handleBlur}
                InputChange={formHandle.handleChange}
                label={"Remote type"}
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Button
              type="submit"
              varient={"fill"}
              text={"Next"}
              className={"py-2 px-4"}
              onClick={formHandle.handleSubmit}
            />
          </div>
        </div>
        {/* step 2  */}
        <div
          ref={stepTwo}
          className="flex flex-col gap-24 min-w-full max-w-full p-8 transition-all"
        >
          <div className="flex flex-col gap-6 min-w-full w-full">
            <div className="flex justify-between items-center">
              <div className="text-[20px]">Create a job</div>
              <div className="text-base ">Step 2</div>
            </div>
            <div className="flex justify-between items-end">
              <Input
                id={"Minimum"}
                InputBlur={formHandle.handleBlur}
                value={formHandle.values.Eminimum}
                placeholder={"Minimum"}
                InputChange={formHandle.handleChange}
                label={"Experience"}
                name={"Eminimum"}
                isError={
                  formHandle.errors.Eminimum && formHandle.touched.Eminimum
                }
                error={formHandle.errors.Eminimum}
              />
              <Input
                id={"maximum"}
                InputBlur={formHandle.handleBlur}
                value={formHandle.values.Emaximum}
                placeholder={"Maximum"}
                name={"Emaximum"}
                error={formHandle.errors.Emaximum}
                isError={
                  formHandle.errors.Eminimum && formHandle.touched.Eminimum
                }
                InputChange={formHandle.handleChange}
              />
            </div>

            <div className="flex justify-between items-end">
              <Input
                id={"SalaryMinimum"}
                InputChange={formHandle.handleChange}
                InputBlur={formHandle.handleBlur}
                value={formHandle.values.Sminimum}
                placeholder={"Minimum"}
                name={"Sminimum"}
                label={"Salary"}
                isError={
                  formHandle.errors.Sminimum && formHandle.touched.Sminimum
                }
                error={formHandle.errors.Sminimum}
              />
              <Input
                InputChange={formHandle.handleChange}
                id={"SalaryMaximum"}
                placeholder={"Maximum"}
                value={formHandle.values.Smaximum}
                InputBlur={formHandle.handleBlur}
                isError={
                  formHandle.errors.Sminimum && formHandle.touched.Sminimum
                }
                error={formHandle.errors.Smaximum}
                name={"Smaximum"}
              />
            </div>

            <Input
              id={"tottalemp"}
              InputChange={formHandle.handleChange}
              name="totalEmp"
              value={formHandle.values.totalEmp}
              placeholder={"ex. 100"}
              InputBlur={formHandle.handleBlur}
              label={"Total employee"}
            />

            <div className="flex gap-1 flex-col justify-center items-start">
              <div className="font-[500] text-sm">Apply Type</div>
              <div className="flex py-2 justify-start items-end gap-4">
                <div className="flex">
                  <Input
                    id={"quickapply"}
                    value={"quickapply"}
                    label={"Quick Apply"}
                    defaultChecked={
                      formHandle.values.applyType === "quickapply"
                        ? true
                        : false
                    }
                    inputClass={"w-[20px]"}
                    InputChange={formHandle.handleChange}
                    InputBlur={formHandle.handleBlur}
                    className={"flex !flex-row-reverse"}
                    type="radio"
                    name="applyType"
                    labelClass={"text-sm text-[#7a7a7a]"}
                  />
                </div>
                <div className="flex">
                  <Input
                    id={"externalapply"}
                    name="applyType"
                    defaultChecked={
                      formHandle.values.applyType === "externalapply"
                        ? true
                        : false
                    }
                    InputBlur={formHandle.handleBlur}
                    value={"externalapply"}
                    InputChange={formHandle.handleChange}
                    type="radio"
                    label={"External Apply"}
                    inputClass={"w-[20px]"}
                    labelClass={"text-sm text-[#7a7a7a]"}
                    className={"flex !flex-row-reverse"}
                  />
                </div>
              </div>
              {formHandle.errors.applyType && formHandle.touched.applyType && (
                <div className="text-xs text-error px-1">
                  {formHandle.errors.applyType}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Button
              varient={"fill"}
              type={"submit"}
              text={"Save"}
              onClick={formHandle.handleSubmit}
              className={"py-2 px-4"}
            />
          </div>
        </div>
      </div>

      <ModalWrapper open={errorModal.modal} hideCloseButtom={true}>
        <ErrorModal
          message={errorModal.message}
          title={errorModal.title}
          buttonTwoText={"Ok"}
          ButtonTwoClick={() => seterrorModal({ ...errorModal, modal: false })}
        />
      </ModalWrapper>
    </CardWrappers>
  );
};

export default memo(Form);
