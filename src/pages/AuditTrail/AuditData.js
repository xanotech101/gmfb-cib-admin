import { ClockIcon } from '@heroicons/react/24/outline';
export const AuditData = ({ data }) => {
  return (
    <div>
      <div role="list" className="divide-y divide-gray-200">
        {data?.trails.length === 0 ? (
          <span className="font-medium">No Audit History Yet!</span>
        ) : (
          ''
        )}
        <div className="user-list">
          <div className="relative overflow-x-auto mt-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs bg-gray-100  uppercase border text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {(data?.trails ?? []).map((trail) => (
                  <tr className="border  hover:bg-gray-50" key={trail._id}>
                    <td className="px-6 py-4 border-l capitalize">{trail.type}</td>
                    <td className="px-6 py-4 border-l">{`${trail.user.firstName} ${trail.user.lastName}`}</td>
                    <td className="px-6 py-4 border-l">
                      <p className="mt-4 gap-2 flex items-center text-sm text-gray-500">
                        {trail.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 border-l">
                      <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                        <ClockIcon
                          className=" h-5 w-5 flex-shrink-0  grooming-text"
                          aria-hidden="true"
                        />
                        <div>
                          <p> {trail.updatedAt.substring(0, 10)}</p>
                          <p className="mt-1">{trail.updatedAt.substr(11, 8)}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
