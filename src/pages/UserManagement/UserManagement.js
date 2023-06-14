/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Container } from 'components/Container/Container';
import { UserManagementTable } from './UserManagementTable';
import { Heading } from 'components/Header/Heading';
import { useQuery } from '@tanstack/react-query';
import { userService } from 'services';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { ExportCSV } from 'components/Export/ExportCsv';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useTableSerialNumber, useRole } from 'hooks';

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
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { isSystemAdmin } = useRole();

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['all-users', page, isSystemAdmin],
    queryFn: () => userService.getAllUsers({ page, search: searchValue }, isSystemAdmin)
  });
  const { data: csv } = useQuery({
    queryKey: ['all-users', { withPagination: false }, isSystemAdmin],
    queryFn: () => userService.getAllUsers({ withPagination: false }, isSystemAdmin)
  });

  const initialSerialNumber = useTableSerialNumber(page);
  const csvData = csv?.users?.map((dat) => {
    return {
      ID: dat?._id,
      EMAIL: dat?.email,
      FIRSTNAME: dat?.firstName,

      LASTNAME: dat?.lastName,
      GENDER: dat?.gender,
      STATUS: dat?.disabled ? 'disabled' : 'active',
      PHONE_NO: dat?.phone,
      ROLE: dat?.role
    };
  });

  return (
    <div className="p-5 mb-24">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <Heading>User Management</Heading>
            <p className="text-sm text-gray-700">List of users in the platform</p>
          </div>
          <div>
            <ExportCSV fileName={'user data'} csvData={csvData} name={'Export Users'} />
          </div>
        </div>

        <SearchFilter
          placeholder={'Search by name or email....'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={refetch}
        />

        {isFetching ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <>
            <RenderData
              data={data}
              initialSerialNumber={initialSerialNumber}
              page={page}
              isSystemAdmin={isSystemAdmin}
            />
            <Pagination
              totalItems={data?.meta?.total ?? 0}
              handlePageClick={setPage}
              currentPage={page}
            />
          </>
        )}
      </Container>
    </div>
  );
};
