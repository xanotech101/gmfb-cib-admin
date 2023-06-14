import { Button } from 'components/Button/Button';
import { SubHeading } from 'components/Header/SubHeading';
import React from 'react';
import GenerateOtp from './GenerateOtp';

const Enabled = ({ enable, cancel, otp = false }) => {
  return (
    <div>
      {otp === true ? (
        <GenerateOtp />
      ) : (
        <div className="text-center ">
          <SubHeading>Do you want to enable this user?</SubHeading>
          <p className="mt-4">please be sure you want to enable user</p>
          <div className="flex justify-center items-center mt-4 gap-6">
            <Button variant="success" onClick={enable}>
              Enable
            </Button>
            <Button variant="outline" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enabled;
