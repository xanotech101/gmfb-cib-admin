import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Link, useParams } from 'react-router-dom';
import { accountService } from 'services';
import { useTransactionHistory, useStore } from 'hooks';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { TransactionHistoryTable } from 'components/TransactionHistory/TransactionHistoryTable';
import { Button } from 'components/Button/Button';
import { naira } from 'utils/currencyFormatter';
import { useTableSerialNumber } from 'hooks/useTableSerialNumber';

const stats = {
  totalUsers: { name: 'Number of users', value: '0' },
  totalSuccessfulTransfers: { name: 'Successful transfers', value: '0' },
  totalFailedTransfers: { name: 'Failed transfers', value: '0' },
  totalAmountDisbursed: { name: 'Amount disbursed', value: '0' }
};

export const RenderData = ({ data, initialSerialNumber }) => {
  if (!data?.IsSuccessful || data?.Message.length === 0) {
    return (
      <EmptyState
        title="No transactions"
        description="You are yet to make a transaction. Check back later."
      />
    );
  } else {
    return (
      <TransactionHistoryTable
        transactions={data?.Message?.data ?? []}
        initialSerialNumber={initialSerialNumber}
      />
    );
  }
};

export const Overview = () => {
  const { id } = useParams();
  const [data, setData] = useState({ ...stats });
  const initialSerialNumber = useTableSerialNumber(1);

  const { currentOrganization } = useStore();
  const { transactions } = useTransactionHistory(
    { PageSize: 10, pageNo: 1 },
    currentOrganization?.accountNumber?.[0]
  );

  const { isLoading, isFetching } = useQuery({
    queryKey: ['corporateAccount', id],
    queryFn: () => accountService.getAccountStats(id),
    enabled: !!id,
    // eslint-disable-next-line no-unused-vars
    onSuccess: ({ success, ...apiStats }) => {
      const updatedData = { ...data };
      Object.keys(apiStats).forEach((key) => {
        updatedData[key].value = apiStats[key];
      });
      updatedData.totalAmountDisbursed.value = naira.format(apiStats.totalAmountDisbursed);
      setData(updatedData);
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 bg-white sm:grid-cols-2 lg:grid-cols-4 ml-2">
        {Object.keys(data).map((stat, statIdx) => (
          <div
            key={stat}
            className={classNames('border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8', {
              'sm:border-l': statIdx % 2 === 1,
              'lg:border-l': statIdx === 2
            })}>
            <p className="truncate text-sm font-medium text-gray-500">{stats[stat]['name']}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
              {isLoading || !id || isFetching ? (
                <ContentLoader viewBox="0 0 380 70">
                  <rect x="0" y="0" rx="5" ry="5" width="200" height="50" />
                </ContentLoader>
              ) : (
                stats[stat]['value']
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="px-10 space-y-6 py-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Recent Transfers</h3>
          <Link to={`/accounts/${id}/transaction-history`}>
            <Button variant="black">
              <span className="text-sm">View all</span>
            </Button>
          </Link>
        </div>
        <div className="mt-5">
          {transactions.isLoading ? (
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          ) : (
            <RenderData data={transactions.data} initialSerialNumber={initialSerialNumber} />
          )}
        </div>
      </div>
    </>
  );
};
