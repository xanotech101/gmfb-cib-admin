import { formatDate } from 'utils';
import { ClockIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useConvertFileToJson, useModal } from 'hooks';
import { useState } from 'react';
import { apiUsageService } from 'services/apiUsage.service';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import { TotalRequest } from './TotalRequest';

export const BvnUsageTable = ({ data, initialSerialNumber }) => {
  const { Modal, showModal } = useModal();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  const params = {
    requesttype: 'Bvn',
    date: date.getFullYear(),
    month: date.toLocaleString('en-US', { month: 'long' })
  };

  const { data: totalCount, isFetching } = useQuery({
    queryKey: ['total-count', { id, date }],
    queryFn: () => (id ? apiUsageService.getApiUsageCount(id, { params }) : null),
    enabled: id !== ''
  });

  const { convertJsonToExcel } = useConvertFileToJson();
  const downloadCSV = () => {
    const breakdown = totalCount?.analytics?.map((dat) => {
      return {
        year: dat?.year,
        month: dat?.month,
        number_of_request: dat?.numberOfRequests
      };
    });
    convertJsonToExcel(breakdown, 'gcmfb-api-breakdown');
  };
  return (
    <table className="min-w-full divide-y divide-gray-200 text-left">
      <thead className="text-xs bg-gray-100 uppercase border text-black">
        <tr>
          <th scope="col" className="p-3">
            S/N
          </th>
          <th scope="col" className="p-3">
            Organization Name
          </th>
          <th scope="col" className="p-3">
            Number of BVN Count
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
              {datum?.BvnCount} Count
            </td>
            <td className="p-3 text-sm font-medium  whitespace-nowrap border">
              <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                <ClockIcon className=" h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>{datum?.createdAt && formatDate(datum.createdAt)}</div>
              </div>
            </td>
            <td className="p-3 text-sm font-medium whitespace-nowrap border">
              <Dropdown
                label={<EllipsisVerticalIcon className="h-5 w-5 ml-4 text-gray-600" />}
                inline={true}
                arrowIcon={false}>
                <Dropdown.Item
                  className="text-primary cursor-pointer"
                  onClick={() => {
                    showModal();
                    setId(datum?._id);
                    setName(datum?.organization_name);
                  }}>
                  View total request
                </Dropdown.Item>
              </Dropdown>
            </td>
          </tr>
        ))}
        {Modal({
          children: (
            <TotalRequest
              name={name}
              setDate={setDate}
              date={date}
              totalCount={totalCount}
              downloadCSV={downloadCSV}
              isFetching={isFetching}
              showModal={showModal}
            />
          )
        })}
      </tbody>
    </table>
  );
};
