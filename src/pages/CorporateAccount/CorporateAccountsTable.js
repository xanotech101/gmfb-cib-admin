import { useNavigate } from 'react-router-dom';
import { SplitButton } from 'components/Button/SplitButton';

export const CorporateAccountsTable = ({ data, initialSerialNumber }) => {
  const navigate = useNavigate();

  const actionItems = (account) => [
    {
      name: 'Transfer Request',
      action: () =>
        navigate(`/accounts/${account._id}/transfer-requests`, {
          state: { data: account }
        })
    },
    {
      name: 'User Management',
      action: () => navigate(`/accounts/${account._id}/users`, { state: { data: account } })
    }
  ];
  console.log(data);

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
            {data?.accounts?.map((datum, i) => (
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
                  <SplitButton
                    buttonText="View"
                    items={actionItems(datum)}
                    mainButtonAction={() => {
                      navigate(`/accounts/${datum._id}/corporate-details`, {
                        state: { data: datum }
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
