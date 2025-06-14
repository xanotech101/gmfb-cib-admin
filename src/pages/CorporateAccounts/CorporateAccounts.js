import { useState } from 'react';
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
import { useTableSerialNumber } from 'hooks';
import Pagination from 'components/Pagination/Pagination';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { isSystemAdmin } from 'utils/getUserRole';

const RenderData = ({ data, initialSerialNumber, refetch }) => {
  const navigate = useNavigate();
  if (data?.length === 0 || !data) {
    return (
      <EmptyState
        title="No Corporate account found"
        description="No corporate account created yet, click on the button below to create one."
        action={
          isSystemAdmin() && {
            label: 'Create corporate account',
            onClick: () => navigate('/accounts/onboard')
          }
        }
      />
    );
  } else {
    return (
      <CorporateAccountsTable
        data={data?.accounts ?? []}
        initialSerialNumber={initialSerialNumber}
        refetch={refetch}
      />
    );
  }
};

export const CorporateAccounts = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['accounts', isSystemAdmin(), page],
    queryFn: () => accountService.getAllAccounts({ page, name: searchValue })
  });

  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <div className="flex flex-col mt-7 p-5">
      <Container>
        <div className="flex justify-between lg:items-center flex-col lg:flex-row">
          <div className="mb-3">
            <Heading>Corporate Accounts</Heading>
            <p className="text-sm text-gray-700">List of all corporate accounts.</p>
          </div>

          {isSystemAdmin() && (
            <div>
              <Link to="/accounts/onboard">
                <Button>
                  Create corporate account
                  <UserPlusIcon width="20px" className="ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        <SearchFilter
          placeholder={'Search by account name....'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={refetch}
        />

        <div className="mt-5">
          {isFetching ? (
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          ) : (
            <>
              <RenderData
                data={data ?? []}
                initialSerialNumber={initialSerialNumber}
                refetch={refetch}
              />
              <Pagination
                totalItems={data?.totalCount ?? 0}
                handlePageClick={setPage}
                currentPage={page}
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
