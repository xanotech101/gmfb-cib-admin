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
    queryKey: ['accounts'],
    queryFn: accountService.getAllAccounts
  });
  const users = data?.filter((dat) => dat._id === id);
  return (
    <div className="w-[60%] p-6">
      <Container>
        <div className="space-y-6">
          <Heading>Corporate Account Details</Heading>
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
                <p> {user?.accountNumber}</p>
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
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CorporateDetails;
