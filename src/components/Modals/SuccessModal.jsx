import React from "react";

const SuccessModal = ({ title, message, ButtonClick }) => {
  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="">
          <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-100 my-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-8 w-8 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              ></path>
            </svg>
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 ">
            <h3
              className="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex justify-center sm:px-6">
        <button
          type="button"
          onClick={ButtonClick}
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
