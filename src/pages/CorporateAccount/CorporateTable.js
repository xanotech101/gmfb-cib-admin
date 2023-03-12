import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { SplitButton } from 'components/Button/SplitButton';

export const CorporateTable = ({ data }) => {
  // const navigate = useNavigate();

  // const actionItems = () => [
  //   {
  //     name: 'Mandate',
  //     action: () => {
  //       navigate('/corporate/edit-user');
  //     }
  //   },
  //   {
  //     name: 'Analytics',
  //     action: () => {}
  //   },
  //   {
  //     name: 'Users',
  //     action: () => {}
  //   }
  // ];

  return (
    <div className="overflow-x-auto">
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Account Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((datum) => (
                <tr key={datum._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    {datum.accountName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    {datum.accountNumber}
                  </td>

                  <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap border">
                    {datum.adminID?.firstName} {datum.adminID?.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <SplitButton
                      buttonText="View"
                      // items={actionItems}
                      mainButtonAction={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
