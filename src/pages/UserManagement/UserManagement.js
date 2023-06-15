import { Container } from 'components/Container/Container';
import { UserManagementTable } from './components/UserManagementTable';
import { Heading } from 'components/Header/Heading';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useTableSerialNumber } from 'hooks';
import { useUsers } from '../../hooks/useUsers';
import { Button } from 'components/Button/Button';

const RenderData = ({ data, initialSerialNumber, page, isSystemAdmin }) => {
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
        isSystemAdmin={isSystemAdmin}
      />
    );
  }
};

export const UserManagement = () => {
  const { users, page, setPage, setSearchValue, searchValue, isDownloadingUsers, downloadUsers } =
    useUsers();
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
            <RenderData data={users?.data} initialSerialNumber={initialSerialNumber} page={page} />
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
