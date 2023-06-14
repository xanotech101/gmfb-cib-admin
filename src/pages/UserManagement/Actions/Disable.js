import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { SubHeading } from 'components/Header/SubHeading';
import React from 'react';

const Disabled = () => {
  return (
    <div>
      <div className="">
        <SubHeading>Are you sure you want to disable this user?</SubHeading>
        <p className="mt-4 flex items-center gap-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-500" /> Note this will stop the user
          from performing any action{' '}
        </p>
        <div className="flex justify-center items-center mt-4 gap-6"></div>
      </div>
    </div>
  );
};

export default Disabled;
