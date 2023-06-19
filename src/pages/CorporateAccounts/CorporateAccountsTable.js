import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Avatar } from 'components/Avatar/Avatar';

export const CorporateAccountsTable = ({ data, initialSerialNumber }) => {
  const navigate = useNavigate();
  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="relative overflow-hidden mt-6">
        <table className="w-full text-left text-sm  text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase border text-black">
            <tr>
              <th scope="col" className="p-3">
                S/N
              </th>
              <th scope="col" className="p-3">
                Account Name
              </th>
              <th scope="col" className="p-3">
                Admin
              </th>
              <th scope="col" className="p-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
            {data?.map((datum, i) => (
              <tr key={datum._id}>
                <td className="whitespace-nowrap p-3  border">{initialSerialNumber + i}</td>
                <td className="whitespace-nowrap p-3 border">{datum.accountName}</td>
                <td className="whitespace-nowrap p-3 border">
                  <div className="flex items-start">
                    <Avatar name={`${datum.adminID?.firstName} ${datum.adminID?.lastName}`} />
                    <div className="pl-3">
                      <div className="text-gray-900 font-semibold capitalize break-words">
                        {datum.adminID?.firstName} {datum.adminID?.lastName}
                      </div>
                      {datum.adminID?.email}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap p-3 text-sm border">
                  <Dropdown
                    label={<EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />}
                    inline={true}
                    arrowIcon={false}>
                    <Dropdown.Item className="text-green-500" onClick={() => {}}>
                      View Details
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-green-500"
                      onClick={() => {
                        navigate(`/accounts/${datum._id}/overview`);
                      }}>
                      Overview
                    </Dropdown.Item>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
