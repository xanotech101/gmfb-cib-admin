import { useQuery } from '@tanstack/react-query';
import { useStore } from 'hooks';
import { useParams } from 'react-router-dom';
import { accountService } from 'services';

export const useAccountDetails = () => {
  const { id: accountId } = useParams();

  const accountDetails = useQuery({
    queryKey: ['account', accountId],
    queryFn: () => accountService.getAccount(accountId),
    enabled: !!accountId,
    onSuccess: (data) => {
      useStore.setState({ currentOrganization: data });
    }
  });

  const account = accountDetails?.data?.accountNumber?.[0];

  const accountBalance = useQuery({
    queryKey: ['account-balance', account],
    queryFn: () => accountService.getAccountByAccountNo(account),
    enabled: !!account
  });

  return {
    accountDetails,
    accountBalance
  };
};
