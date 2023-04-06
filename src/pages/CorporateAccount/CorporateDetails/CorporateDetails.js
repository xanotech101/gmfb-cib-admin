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
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <p className="font-medium">Name</p>
              <p>
                {data?.accountName && <Avatar name={data?.accountName} />}
                <span className="ml-4">{data?.accountName}</span>
              </p>
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
