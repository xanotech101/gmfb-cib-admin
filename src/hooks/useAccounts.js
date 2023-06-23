import { useMutation } from '@tanstack/react-query';
import { accountService } from 'services';

export const useAccount = (refetch) => {
  const enableAccount = useMutation({
    mutationFn: (payload) => accountService.enableAccount(payload),
    onSuccess: (_, variables) => {
      refetch();
      variables.successCb();
    }
  });

  const disableAccount = useMutation({
    mutationFn: (payload) => accountService.disableAccount(payload),
    onSuccess: (_, variables) => {
      refetch();
      variables.successCb();
    },
    onError: () => {}
  });

  return {
    enableAccount,
    disableAccount
  };
};
