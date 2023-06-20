import { useMutation } from '@tanstack/react-query';
import { userService } from 'services';

export const useUsers = (refetch) => {
  const enableUser = useMutation({
    mutationFn: (payload) => userService.enableUser(payload),
    onSuccess: (_, variables) => {
      refetch();
      variables.successCb();
    }
  });

  const disableUser = useMutation({
    mutationFn: (payload) => userService.disableUser(payload),
    onSuccess: (_, variables) => {
      refetch();
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
    enableUser,
    disableUser,
    switchUsers
  };
};
