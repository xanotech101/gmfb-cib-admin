import { useNavigate } from 'react-router-dom';
import { SplitButton } from 'components/Button/SplitButton';
import { Badge } from 'components/Badge/Badge';
export const CorporateTable = ({ data }) => {
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
    <div className="">
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
              {data.map((datum, i) => (
                <tr key={datum._id}>
<<<<<<< HEAD
                  <td className="px-5 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
=======
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
>>>>>>> 04f8fa1ef33c322b6176913c288a10a575a2e329
                    {i + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    {datum.accountName}
                  </td>
<<<<<<< HEAD
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    {datum.accountNumber.map((dat) => (
                      <div key={dat}>
                        <div className="mb-4">
                          <Badge>{dat}</Badge>
                        </div>
                      </div>
                    ))}
                  </td>

=======
>>>>>>> 04f8fa1ef33c322b6176913c288a10a575a2e329
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
    </div>
  );
};
