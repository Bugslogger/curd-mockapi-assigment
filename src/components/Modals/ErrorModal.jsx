import React from "react";

const ErrorModal = ({
  title,
  message,
  ButtonOneClick,
  ButtonTwoClick,
  buttonTwoText,
  buttonOneText,
}) => {
  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="">
          <div className="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-red-100 my-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
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
        {ButtonOneClick && (
          <button
            type="button"
            onClick={ButtonOneClick}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3"
          >
            {buttonOneText || "Delete"}
          </button>
        )}{" "}
        {ButtonTwoClick && (
          <button
            onClick={ButtonTwoClick}
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-base font-semibold border border-red-500 text-error shadow-sm sm:ml-3"
          >
            {buttonTwoText || "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorModal;
