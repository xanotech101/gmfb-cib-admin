import { Button } from 'components/Button/Button';
import { useLogout } from 'hooks';
import React from 'react';

const LogoutPrompt = ({ closeModal }) => {
  const { handleLogout } = useLogout();
  return (
    <div className="flex justify-center items-center flex-col space-y-6 ">
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-3 items-center">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleLogout();
            closeModal();
          }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutPrompt;
