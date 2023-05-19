import { useState } from 'react';
import { Container } from 'components/Container/Container';
import { UserManagementTable } from './UserManagementTable';
import { Heading } from 'components/Header/Heading';
import { useQuery } from '@tanstack/react-query';
import { userService } from 'services';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { EmptyState } from 'components/EmptyState/EmptyState';

const RenderData = ({ data, setPage, page }) => {
  if (data?.requests?.length === 0 || !data) {
    return (
      <EmptyState
        title="No request found"
        description="No request found, please check back later."
      />
    );
  } else {
    return (
      <>
        <UserManagementTable users={data?.users ?? []} />
        <Pagination
          totalItems={data?.meta?.total ?? 0}
          handlePageClick={setPage}
          currentPage={page}
        />
      </>
    );
  }
};

export const UserManagement = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['all-users', page],
    queryFn: () => userService.getAllUsers({ page })
  });

  return (
    <div className="p-5">
      <Container>
        <Heading>User Management</Heading>
        <p className="text-sm text-gray-700">List of users in the platform</p>
        {isLoading ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <RenderData data={data} setPage={setPage} page={page} />
        )}
      </Container>
    </div>
  );
};
