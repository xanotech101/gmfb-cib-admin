import { Avatar } from 'components/Avatar/Avatar';

export const CorporateUsersTable = ({ users }) => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              S/N
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Gender
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Role
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users?.map((user, i) => (
            <tr key={user.email}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{i}</td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <div className="flex items-center">
                  <Avatar name={`${user.firstName} ${user.lastName}`} />
                  <span className="pl-3">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.gender}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
