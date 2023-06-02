import ContentLoader from 'react-content-loader';
import { Heading } from 'components/Header/Heading';
import { Container } from 'components/Container/Container';
import { CorporateAccountsTable } from './CorporateAccountsTable';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { accountService } from 'services';
import { Button } from 'components/Button/Button';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { useTableSerialNumber, useRole } from 'hooks';

const RenderData = ({ data }) => {
  const navigate = useNavigate();
  if (data?.length === 0) {
    return (
      <EmptyState
        title="No Corporate account found"
        description="No corporate account created yet, click on the button below to create one."
        action={{
          label: 'Create Corporate Account',
          onClick: () => navigate('/accounts/onboard')
        }}
      />
    );
  } else {
    return <CorporateAccountsTable data={data} useTableSerialNumber={useTableSerialNumber} />;
  }
};

export const Corporate = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getAllAccounts(isSystemAdmin)
  });

  const { isSystemAdmin } = useRole();

  return (
    <div className="flex flex-col mt-7 p-5">
      <Container>
        <div className="flex justify-between lg:items-center flex-col lg:flex-row">
          <div className="mb-3">
            <Heading>Corporate Accounts</Heading>
            <p className="text-sm text-gray-700">List of all corporate accounts.</p>
          </div>

          <div>
            <Link to="/accounts/onboard">
              <Button>
                Create corporate account
                <UserPlusIcon width="20px" className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-5">
          {isFetching ? (
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          ) : (
            <RenderData data={data ?? []} />
          )}
        </div>
      </Container>
    </div>
  );
};
