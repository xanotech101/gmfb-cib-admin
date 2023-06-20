import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { useParams } from 'react-router-dom';
import { userService } from 'services';
import Pagination from 'components/Pagination/Pagination';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useTableSerialNumber } from 'hooks';
import { UserManagementTable } from 'components/UserManagement/UserManagementTable';

export const CorporateUsers = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { id } = useParams();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['get-branch-users', id, page],
    queryFn: () =>
      userService.getBranchUsers({
        branchId: id,
        withPagination: true,
        search: searchValue
      }),
    enabled: !!id
  });

  const initialSerialNumber = useTableSerialNumber(page);

  const RenderData = () => {
    if (data?.users?.length === 0 || !data) {
      return <EmptyState title="No users found within this branch" />;
    } else {
      return (
        <UserManagementTable
          initialSerialNumber={initialSerialNumber}
          users={data?.users ?? []}
          page={page}
          refetch={refetch}
        />
      );
    }
  };

  return (
    <div className="px-10 space-y-6 py-8">
      <h3 className="text-xl font-medium leading-6 text-gray-900 mt-4">Users</h3>
      <div>
        {(data?.users?.length > 0 || searchValue) && (
          <SearchFilter
            placeholder={'Search by email or name....'}
            value={searchValue}
            setValue={setSearchValue}
            onSearch={refetch}
          />
        )}
        <div className="flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {isLoading || isFetching ? (
                <ContentLoader viewBox="0 0 380 70">
                  <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
                </ContentLoader>
              ) : (
                <>
                  <RenderData />
                  <Pagination
                    totalItems={data?.meta?.totalCount ?? 0}
                    handlePageClick={setPage}
                    currentPage={page}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
