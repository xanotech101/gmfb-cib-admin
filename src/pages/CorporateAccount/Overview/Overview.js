import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useParams } from 'react-router-dom';
import { accountService } from 'services';

const stats = {
  totalUsers: { name: 'Number of users', value: '0' },
  totalSuccessfulTransfers: { name: 'Successful transfers', value: '0' },
  totalFailedTransfers: { name: 'Failed transfers', value: '0' },
  totalAmountDisbursed: { name: 'Amount disbursed', value: '0' }
};

export const Overview = () => {
  const { id } = useParams();
  const [data, setData] = useState({ ...stats });

  const { isLoading, isFetching } = useQuery({
    queryKey: ['corporateAccount', id],
    queryFn: () => accountService.getAccountStats(id),
    enabled: !!id,
    // eslint-disable-next-line no-unused-vars
    onSuccess: ({ success, ...apiStats }) => {
      const updatedData = data;
      Object.keys(apiStats).forEach((key) => {
        if (key === 'totalAmountDisbursed') {
          data[key].value = `₦${updatedData[key].toLocaleString()}`;
        }
        data[key].value = apiStats[key];
      });
      setData(updatedData);
    }
  });

  return (
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
  );
};
