import { Button } from 'components/Button/Button';
import React from 'react';

const LogoutPrompt = ({ navigate, closeModal }) => {
  return (
    <div className="flex justify-center items-center flex-col space-y-6 ">
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-3 items-center">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={navigate}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutPrompt;
