/* eslint-disable no-unused-vars */
import { Avatar } from 'components/Avatar/Avatar';
import React from 'react';
import { accountService } from 'services';
import { Button } from 'components/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container } from 'components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';
<<<<<<< HEAD
import { Badge } from 'components/Badge/Badge';
=======

>>>>>>> 04f8fa1ef33c322b6176913c288a10a575a2e329
const CorporateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['account-info'],
    queryFn: () => accountService.getAccount(id)
  });

  return (
    <div className="w-[60%] p-6">
      <Container>
        <div className="space-y-6">
          <Heading>Corporate Account Details</Heading>
<<<<<<< HEAD
          {users.map((user) => (
            <div className="space-y-10" key={user?.accountName}>
              <div className="flex items-center justify-between">
                <p className="font-medium">Name</p>
                <p>
                  <Avatar name={user?.accountName} />
                  <span className="ml-4">{user?.accountName}</span>
                </p>
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <p className="font-medium">Account Number</p>
                <div>
                  {' '}
                  {user?.accountNumber.map((dat) => (
                    <div key={dat} className="flex-col flex">
                      <div className="mb-4">
                        <Badge>{dat}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <p className="font-medium">Admin</p>
                <p>
                  {user?.adminID?.firstName} {user?.adminID?.lastName}
                </p>
              </div>
              <hr />
              <div>
                <Button
                  isFullWidth
                  onClick={() => {
                    navigate(`/accounts/${user?._id}/users`, {
                      state: { user: data }
                    });
                  }}>
                  View all corporate users
                </Button>
              </div>
=======
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <p className="font-medium">Name</p>
              <p>
                {data?.accountName && <Avatar name={data?.accountName} />}
                <span className="ml-4">{data?.accountName}</span>
              </p>
>>>>>>> 04f8fa1ef33c322b6176913c288a10a575a2e329
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p className="font-medium">Admin</p>
              <p>
                {data?.adminID?.firstName} {data?.adminID?.lastName}
              </p>
            </div>
            <hr />
            <div className="flex justify-between flex-col">
              <p className="font-medium mb-3">Account Number</p>
              <p className="flex gap-2 flex-wrap">
                {data?.accountNumber?.map((item, index) => (
                  <span className="" key={index}>
                    {item}
                  </span>
                ))}
              </p>
            </div>
            <hr />
            <div>
              <Button
                isFullWidth
                onClick={() => {
                  navigate(`/accounts/${data?._id}/users`, {
                    state: { accountName: data?.accountName }
                  });
                }}>
                View all corporate users
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CorporateDetails;
