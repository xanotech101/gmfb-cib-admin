import { Avatar } from 'components/Avatar/Avatar';
import React from 'react';
import { Button } from 'components/Button/Button';
const CorporateDetails = ({ data, navigate }) => {
  return (
    <div className="space-y-6">
      <h1 className="font-medium text-xl">Corporate user details</h1>
      <div className="flex items-center justify-between">
        <p>Name</p>
        <p>
          <Avatar name={data.accountName} />
          <span className="ml-4">{data.accountName}</span>
        </p>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <p>Account Number</p>
        <p> {data.accountNumber}</p>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <p>Admin</p>
        <p>
          {data.adminID?.firstName} {data.adminID?.lastName}
        </p>
      </div>
      <hr />
      <div>
        <Button onClick={navigate} isFullWidth>
          View all corporate users
        </Button>
      </div>
    </div>
  );
};

export default CorporateDetails;
