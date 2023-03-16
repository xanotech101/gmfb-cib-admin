import { ModalButton } from 'components/Button/Button';
import React from 'react';

const LogoutPrompt = ({ navigate, closeModal }) => {
  return (
    <div className="flex justify-center items-center flex-col space-y-6 ">
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-3 items-center">
        <ModalButton bg="bg-red-500 text-white-500" onClick={closeModal}>
          Cancel
        </ModalButton>
        <ModalButton bg=" text-white-500" onClick={navigate}>
          Logout
        </ModalButton>
      </div>
    </div>
  );
};

export default LogoutPrompt;
