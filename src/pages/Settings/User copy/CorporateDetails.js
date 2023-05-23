import { Avatar } from 'components/Avatar/Avatar';
import { Badge } from 'components/Badge/Badge';
import React from 'react';

const CorporateDetails = ({ user }) => {
  return (
    <div className="space-y-6">
      <h1 className="font-medium text-xl">Corporate user details</h1>
      <hr />
      <div className="flex items-center justify-between">
        <p>Name</p>
        <p>
          <Avatar name={`${user.firstName} ${user.lastName}`} />
          <span className="ml-4 capitalize">
            {' '}
            {user.firstName} {user.lastName}
          </span>
        </p>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <p>Email</p>
        <p> {user.email}</p>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <p>Gender</p>
        <p className="capitalize">{user.gender}</p>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <p>Role</p>
        <p className="capitalize">{user.role}</p>
      </div>
      <hr />
      <div className="flex flex-col">
        <p>Privileges</p>
        <p className="capitalize flex flex-wrap">
          {user.privileges?.map((privilege) => (
            <p key={privilege.name} className="mr-2 mt-3">
              <Badge status="approved">{privilege.name}</Badge>
            </p>
          ))}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default CorporateDetails;
