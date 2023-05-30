/* eslint-disable no-unused-vars */
import { Avatar } from 'components/Avatar/Avatar';
import React from 'react';
import { accountService } from 'services';
import { Button } from 'components/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container } from 'components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { Heading } from 'components/Header/Heading';
import { Badge } from 'components/Badge/Badge';
import { GridLoader } from 'react-spinners';

const CorporateDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getAccount(id),
    enabled: !!id
  });

  return (
    <div className="w-[60%] p-6">
      <Container>
        <div className="space-y-6">
          <Heading>Corporate Account Details</Heading>
          {isLoading ? (
            <div className="flex justify-center py-14">
              <GridLoader size={20} color={'#891c69'} />
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <p className="font-medium">Name</p>
                <p>
                  <Avatar name={data?.accountName ?? ' '} />
                  <span className="ml-4">{data?.accountName}</span>
                </p>
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <p className="font-medium">Account Number</p>
                <div>
                  {' '}
                  {data?.accountNumber?.map((dat) => (
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
                  {data?.adminID?.firstName} {data?.adminID?.lastName}
                </p>
              </div>
              <hr />
              <div>
                <Button
                  isFullWidth
                  onClick={() => {
                    navigate(`/accounts/${data?._id}/users`, {
                      state: { accountName: data.accountName }
                    });
                  }}>
                  View all corporate users
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CorporateDetails;
