import { useMemo } from 'react';
import { useStore } from './useStore';
import { useStorage } from './useStorage';

export const useAccount = () => {
  const { user } = useStore();
  const [account, setAccount] = useStorage(
    'account',
    user?.organizationId?.accountNumber[0] ?? undefined,
    true
  );

  const accounts = useMemo(() => user?.organizationId?.accountNumber, [user]);

  const switchAccount = (account) => {
    setAccount(account);
    useStore.setState({ account });
  };

  return {
    accounts,
    switchAccount,
    account
  };
};
