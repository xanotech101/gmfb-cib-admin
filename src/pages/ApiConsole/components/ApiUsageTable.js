import { DateUtils, DateFormats } from 'utils';
import { ClockIcon } from '@heroicons/react/24/outline';

export const ApiUsageTable = ({ data, initialSerialNumber }) => {
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
                <div>
                  {datum?.createdAt &&
                    DateUtils.dateToString(datum.createdAt, DateFormats.frontendDateTime)}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
