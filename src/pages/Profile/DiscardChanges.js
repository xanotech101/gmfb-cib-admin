import { ModalButton } from 'components/Button/Button';
import React from 'react';

export const DiscardChanges = ({ accept, decline,children }) => {
  return (
    <div className="text-center">
      <p>{children}</p>
      <div className="flex justify-center mt-4">
        <ModalButton bg="bg-white hover:bg-gray-50" ring="focus:ring-indigo-500" onClick={accept}>
          Yes
        </ModalButton>
        <ModalButton ring="focus:ring-red-500" onClick={decline}>
          No
        </ModalButton>
      </div>
    </div>
  );
};
