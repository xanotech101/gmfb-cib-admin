import { Avatar } from 'components/Avatar/Avatar';

export const AuditTrailTable = ({ data, initialSerialNumber }) => {
  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="user-list">
        <div className="relative overflow-auto mt-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-gray-100  uppercase border text-black">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 w-[5%]">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3 w-[20%]">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 w-[30%]">
                  User
                </th>
                <th scope="col" className="px-6 py-3 w-[45%]">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {(data?.trails ?? []).map((trail, i) => (
                <tr className="border hover:bg-gray-50" key={trail._id}>
                  <td className=" px-3 py-4 text-sm text-gray-500 border">
                    {initialSerialNumber + i}
                  </td>
                  <td className="px-6 py-4 border-l capitalize">{trail.type}</td>
                  <td className="px-6 py-4 border-l">
                    <div className="flex items-center">
                      <Avatar name={`${trail.user?.firstName} ${trail.user?.lastName}`} />
                      <span className="pl-3">
                        {trail.user?.firstName} {trail.user?.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-l">
                    <p className="mt-4 gap-2 flex items-center text-sm text-gray-500">
                      {trail.message}
                    </p>
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
