import { formatDate } from 'utils';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/Button/Button';
import { useModal } from 'hooks';
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Label } from 'components/Form/Label/Label';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'components/Spinner/Spinner';
import { Badge } from 'components/Badge/Badge';
import { apiUsageService } from 'services/apiUsage.service';
export const ApiUsageTable = ({ data, initialSerialNumber }) => {
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState('');
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const {
    data: thirdparty,
    refetch,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['enquiry', user?._id, { date: year, requesttype: 'Bvn' }],
    queryFn: () => apiUsageService.getApi(user?._id, { date: year, requesttype: 'NameEnquiry' })
  });
  const sumOfRequests = useMemo(() => {
    return thirdparty?.analytics?.length === 0 || thirdparty?.analytics === undefined
      ? '0 Request'
      : thirdparty?.analytics?.reduce(
          (total, obj) => `${total + obj?.numberOfRequests} Request`,
          0
        );
  }, [thirdparty]);

  return (
    <table className="min-w-full divide-y divide-gray-200 text-left">
      <thead className="text-xs bg-gray-100 uppercase border text-black">
        <tr>
          <th scope="col" className="p-3">
            S/N
          </th>
          <th scope="col" className="p-3 py-3 text-xs font-bold ">
            Organization Name
          </th>
          <th scope="col" className="p-3">
            Number of Request
          </th>

          <th scope="col" className="p-3">
            time created
          </th>
          <th scope="col" className="p-3">
            <span className="sr-only">Action</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 ">
        {data?.results?.map((datum, i) => (
          <tr key={datum?._id}>
            <td className="p-3 text-sm font-medium text-gray-800 whitespace-nowrap border">
              {initialSerialNumber + i}
            </td>
            <td className="p-3 text-sm font-medium text-gray-800 whitespace-nowrap border">
              {datum?.organization_name}
            </td>
            <td className="p-3 text-sm  font-medium text-gray-800 whitespace-nowrap border">
              {datum?.requestCount} Request
            </td>
            <td className="p-3 text-sm font-medium whitespace-nowrap border">
              <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                <ClockIcon className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>{datum?.createdAt && formatDate(datum.createdAt)}</div>
              </div>
            </td>
            <td className="p-3 text-sm  font-medium text-gray-800 whitespace-nowrap border">
              <Button
                variant="outline"
                onClick={() => {
                  showModal();
                  setUser(datum);
                }}>
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>{' '}
      {Modal({
        size: 'md',
        children: (
          <>
            <div className="  flex items-center justify-between">
              <p className="font-medium text-[20px]">Thirdparty Analytics</p>
              <div className="w-[100px]">
                <Label label="Select Year" />
                <DatePicker
                  selected={new Date(year, 0, 1)}
                  showMonthDropdown
                  onChange={(date) => {
                    setYear(date.getFullYear());
                    refetch();
                  }}
                  showYearPicker
                  dateFormat="yyyy"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>
            {isLoading || isFetching ? (
              <div className="flex items-center justify-center h-[200px]">
                <Spinner />
              </div>
            ) : (
              <div className="mt-7">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                  <div className="sm:col-span-3 flex justify-between border-b pb-4">
                    <dt className="text-sm font-medium text-gray-500">Organization Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <Badge>{user?.organization_name}</Badge>
                    </dd>
                  </div>
                  <div className="sm:col-span-3 flex justify-between border-b pb-4">
                    <dt className="text-sm font-medium text-gray-500">Total Request</dt>
                    <dd className="mt-1 text-sm text-gray-900">{sumOfRequests}</dd>
                  </div>

                  <div className="sm:col-span-3 flex justify-between border-b pb-4">
                    <dt className="text-sm font-medium text-gray-500">Year</dt>
                    <dd className="mt-1 text-sm text-gray-900">{year}</dd>
                  </div>
                </dl>
              </div>
            )}
          </>
        )
      })}
    </table>
  );
};
