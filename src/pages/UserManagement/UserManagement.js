import { Container } from 'components/Container/Container';
import { UserManagementTable } from 'components/UserManagement/UserManagementTable';
import { Heading } from 'components/Header/Heading';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useConvertFileToJson, useTableSerialNumber } from 'hooks';
import { Button } from 'components/Button/Button';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from 'services';
import { isGcAdmin } from 'utils/getUserRole';

const RenderData = ({ data, initialSerialNumber, page, refetch }) => {
  if (data?.requests?.length === 0 || !data) {
    return (
      <EmptyState title="No user found" description="No user found, please check back later." />
    );
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

export const UserManagement = () => {
  const { convertJsonToExcel } = useConvertFileToJson();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const users = useQuery({
    queryKey: ['all-users-paginated', page, isGcAdmin()],
    queryFn: () => userService.getAllUsers({ page, search: searchValue })
  });
  const { isLoading: isDownloadingUsers, mutate: downloadUsers } = useMutation({
    mutationKey: ['all-users', { withPagination: false }],
    mutationFn: () => userService.getAllUsers({ withPagination: false }),
    onSuccess: (data) => {
      const users = data?.users?.map((dat) => {
        return {
          ID: dat._id,
          Email: dat.email,
          Name: dat.firstName + ' ' + dat.lastName,
          Gender: dat.gender,
          Status: dat.disabled ? 'disabled' : 'active',
          'Phone Number': dat.phone,
          Role: dat.role,
          Branch: dat.organizationId?.accountName
        };
      });
      convertJsonToExcel(users, 'gcmfb-users');
    }
  });
  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <div className="p-5 mb-24">
      <Container>
        <div className="flex justify-between items-center">
          <Heading>User Management</Heading>
          <Button disabled={isDownloadingUsers} onClick={downloadUsers}>
            Export Users
          </Button>
        </div>
        <SearchFilter
          placeholder={'Search by name or email....'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={users.refetch}
        />
        {users.isLoading ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <>
            <RenderData
              data={users?.data}
              initialSerialNumber={initialSerialNumber}
              page={page}
              refetch={users.refetch}
            />
            <Pagination
              totalItems={users?.data?.meta?.total ?? 0}
              handlePageClick={setPage}
              currentPage={page}
            />
          </>
        )}
      </Container>
    </div>
  );
};
