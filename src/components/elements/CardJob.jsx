import React from "react";
import CardWrappers from "../wrappers/CardWrappers";
import Button from "./Button";
import { MdEdit, MdDelete } from "react-icons/md";

const CardJob = ({ onEdit, onDelete, onClick, data }) => {
  return (
    <CardWrappers
      className={
        "w-[830px] m-4 py-4 px-6 border flex justify-between items-start bg-white border-gray rounded-[10px]"
      }
    >
      <div className="flex justify-start items-start gap-2">
        <div className="w-12 rounded overflow-hidden">
          <img
            src="https://static-00.iconduck.com/assets.00/netflix-icon-icon-2048x2048-yj41gpvr.png"
            alt=""
          />
        </div>
        <div className="font-poppins flex flex-col gap-6">
          <div>
            {data?.title && <div className="text-2xl">{data?.title}</div>}
            {data?.industry && (
              <div className="">
                {data?.companyName} - {data?.industry}
              </div>
            )}
            {data?.location && (
              <div className="text-[#7a7a7a]">
                {`${data?.location} (${data?.remoteType})`}
              </div>
            )}
          </div>
          <div className=" flex flex-col gap-2">
            <div>Part-Time (9.00 am - 5.00 pm IST)</div>
            {data?.Experience && (
              <div>Experience ({data?.Experience} years)</div>
            )}
            {data?.Salary && <div>INR (₹) {data?.Salary} / Month</div>}
            {data?.numberOfEmployee && (
              <div>{data?.numberOfEmployee} employees</div>
            )}
          </div>
          <div>
            <Button
              varient={data?.applyType === "quickapply" ? "fill" : "outline"}
              onClick={onClick}
            >
              {data?.applyType === "quickapply"
                ? "Apply Now"
                : "External Apply"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <MdEdit
          onClick={onEdit}
          className="text-[24px] cursor-pointer text-error"
        />
        <MdDelete
          onClick={onDelete}
          className="text-[24px] cursor-pointer text-green-700"
        />
      </div>
    </CardWrappers>
  );
};

export default CardJob;

// Experience: "2-3";
// Salary: "33-";
// applyType: "quickapply";
// comapnyLogo: "comapnyLogo 4";
// companyName: "Plazacloud technoloha";
// createdAt: "2023-12-13T16:01:12.894Z";
// description: "description 4";
// id: "4";
// industry: "IT & Services";
// jobType: "jobType 4";
// location: "nagpur";
// numberOfEmployee: "223";
// remoteType: "remote";
// title: "Frontend Developer";
