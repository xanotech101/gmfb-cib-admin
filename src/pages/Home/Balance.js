import { BanknotesIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { Container } from 'components/Container/Container';
import { useMemo } from 'react';
import { accountService } from 'services';

export default function BalanceCard() {
  const { data } = useQuery({
    queryKey: ['account-balance'],
    queryFn: accountService.getAccountByAccountNo
  });

  const balances = useMemo(() => {
    return [
      {
        label: 'Available Balance',
        value: data?.AvailableBalance ?? 0.0
      },
      {
        label: 'Ledger Balance',
        value: data?.LedgerBalance ?? 0.0
      },
      {
        label: 'Withdrawable Balance',
        value: data?.WithdrawableBalance ?? 0.0
      }
    ];
  }, [data]);

  return (
    <div className="lg:grid grid-cols-3 flex flex-col gap-5 mb-5">
      {balances?.map((balance) => (
        <Container key={balance.label}>
          <dt>
            <div className="absolute rounded-md bg-primary p-3">
              <BanknotesIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{balance.label}</p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 tracking-tight flex items-center">
              <span className="flex-shrink-0 w-6">
                <img src="https://cdn-icons-png.flaticon.com/512/32/32974.png" className="w-full" />
              </span>{' '}
              {balance.value}
            </p>
          </dd>
        </Container>
      ))}
    </div>
  );
}
