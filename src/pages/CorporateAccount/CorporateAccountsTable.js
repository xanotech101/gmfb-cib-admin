import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

export const CorporateAccountsTable = ({ data, initialSerialNumber }) => {
  const navigate = useNavigate();
  return (
    <div className="p-1.5 w-full inline-block align-middle">
      <div className="border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                S/N
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                Account Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                Admin Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                Admin Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {data?.map((datum, i) => (
              <tr key={datum._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                  {initialSerialNumber + i}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                  {datum.accountName}
                </td>
                <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap border">
                  {datum.adminID?.firstName} {datum.adminID?.lastName}
                </td>
                <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap border">
                  {datum.adminID?.email}
                </td>

                <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap ">
                  <Dropdown
                    label={<EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />}
                    inline={true}
                    arrowIcon={false}>
                    <Dropdown.Item
                      className="text-green-500"
                      onClick={() => {
                        navigate(`/accounts/${datum._id}/transfer-requests`, {
                          state: { data: datum }
                        });
                      }}>
                      Transfer requests
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-green-500"
                      onClick={() => {
                        navigate(`/accounts/${datum._id}/users`, { state: { data: datum } });
                      }}>
                      User management
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
