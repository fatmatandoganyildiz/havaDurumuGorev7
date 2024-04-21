import React from "react";

const Modal = ({ isOpen, handleCloseModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-50 justify-center">
      <div className="relative bg-pink-200 p-6 rounded-lg">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-xl text-red font-semibold bg-pink-300 hover:bg-pink-400 cursor-pointer px-4 py-2 rounded-full"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
