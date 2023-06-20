import { Avatar } from 'components/Avatar/Avatar';
import { naira } from 'utils/currencyFormatter';
import { Dropdown } from 'flowbite-react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

export const MandateRuleTable = ({ mandates, setMandate, initialSerialNumber }) => {
  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="relative overflow-hidden mt-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase border text-black">
            <tr>
              <th scope="col" className="p-3">
                S/N
              </th>
              <th scope="col" className="p-3">
                Name
              </th>

              <th scope="col" className="p-3">
                Min amount
              </th>
              <th scope="col" className="p-3">
                Max amount
              </th>
              <th scope="col" className="p-3">
                Authorizer
              </th>
              <th scope="col" className="p-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mandates.map((mandate, i) => (
              <tr key={mandate.name} className="border hover:bg-gray-50">
                <td className="whitespace-nowrap p-3 border capitalize">
                  {initialSerialNumber + i}
                </td>
                <td className="whitespace-nowrap p-3 border capitalize">{mandate.name}</td>
                <td className="whitespace-nowrap p-3 border capitalize">
                  {naira.format(mandate.minAmount)}
                </td>
                <td className="whitespace-nowrap p-3 border capitalize">
                  {naira.format(mandate.maxAmount)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Avatar
                    name={`${mandate?.authoriser?.firstName} ${mandate?.authoriser?.lastName}`}
                  />
                </td>
                <td className="whitespace-nowrap p-3 border capitalize">
                  <Dropdown
                    label={<EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />}
                    inline={true}
                    arrowIcon={false}
                    placement="left">
                    <Dropdown.Item>
                      <a href="#" className="text-primary mr-3" onClick={() => setMandate(mandate)}>
                        View
                      </a>
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
