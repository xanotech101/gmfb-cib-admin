import { useMutation, useQuery } from '@tanstack/react-query';
import { useConvertFileToJson } from 'hooks';
import { useState } from 'react';
import { userService } from 'services';

export const useUsers = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { convertJsonToExcel } = useConvertFileToJson();

  const users = useQuery({
    queryKey: ['all-users-paginated', page],
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

  return {
    users,
    page,
    setPage,
    searchValue,
    setSearchValue,
    isDownloadingUsers,
    downloadUsers
  };
};
