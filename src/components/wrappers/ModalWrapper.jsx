import React from "react";
import { MdOutlineClose } from "react-icons/md";

const ModalWrapper = ({ children, open, closeModal, hideCloseButtom }) => {
  return (
    <div className={`relative z-10 ${!open ? "hidden" : ""}  transition-all`}>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
        {!hideCloseButtom && (
          <div className="absolute top-4 right-10 z-20">
            <MdOutlineClose
              className="text-[24px] cursor-pointer"
              onClick={closeModal}
            />
          </div>
        )}
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
