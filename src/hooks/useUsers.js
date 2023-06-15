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

  const enableUser = useMutation({
    mutationFn: (payload) => userService.enableUser(payload),
    onSuccess: (_, variables) => {
      users.refetch();
      variables.successCb();
    }
  });

  const disableUser = useMutation({
    mutationFn: (payload) => userService.disableUser(payload),
    onSuccess: (_, variables) => {
      users.refetch();
      variables.successCb();
    },
    onError: (error, variables) => {
      if (error?.status === 422) {
        variables.switchUsers(error.data.message);
      }
    }
  });

  const switchUsers = useMutation({
    mutationFn: (payload) => userService.switchUsers(payload),
    onSuccess: (_, variables) => {
      variables.successCb();
    }
  });

  return {
    users,
    page,
    setPage,
    searchValue,
    setSearchValue,
    isDownloadingUsers,
    downloadUsers,
    enableUser,
    disableUser,
    switchUsers
  };
};
