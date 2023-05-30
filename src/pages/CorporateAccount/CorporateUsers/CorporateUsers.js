import { useQuery } from '@tanstack/react-query';
import { SubHeading } from 'components/Header/SubHeading';
import { Container } from 'components/Container/Container';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { useLocation, useParams } from 'react-router-dom';
import { userService } from 'services';
import { CorporateUsersTable } from './CorporateUsersTable';
import Pagination from 'components/Pagination/Pagination';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';

export const CorporateUsersUnderCorporateAccount = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { state } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['getMyBranchUsers', id],
    queryFn: () =>
      userService.getBranchUsers({
        branchId: id,
        withPagination: true
      }),
    enabled: !!id
  });
  console.log(data);
  const RenderData = () => {
    if (data?.users?.length === 0) {
      return <EmptyState title="No users found within this branch" />;
    } else {
      return <CorporateUsersTable users={data?.users ?? []} />;
    }
  };

  return (
    <div className="p-6">
      <Container>
        <SubHeading>
          List of corporate users created within{' '}
          <strong>
            <span>{state?.accountName}</span>
          </strong>
        </SubHeading>
        <div className="w-[40%] mt-4">
          <SearchFilter placeholder={'Search for corporate users'} />
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {isLoading ? (
                <ContentLoader viewBox="0 0 380 70">
                  <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
                </ContentLoader>
              ) : (
                <RenderData />
              )}
            </div>
          </div>
        </div>
        <Pagination
          totalItems={data?.meta?.total ?? 0}
          handlePageClick={setPage}
          itemsPerPage={data?.meta?.perPage}
          currentPage={page}
        />
      </Container>
    </div>
  );
};

export default CorporateUsersUnderCorporateAccount;
