import { Avatar } from 'components/Avatar/Avatar';
import { SplitButton } from 'components/Button/SplitButton';
import { useModal } from 'hooks';
import { useState } from 'react';
import SwitchRoles from './SwitchRoles/SwitchRoles';
const users = [
  {
    firstName: 'Lindsay',
    lastName: 'walton',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    gender: 'male'
  },
  {
    firstName: 'Adenuga',
    lastName: 'Tunmise',
    email: 'hosiv4456@gmail.com',
    role: 'Admin',
    gender: 'male'
  },
  {
    firstName: 'Great',
    lastName: 'DevOPs',
    email: 'hosiv7456@gmail.com',
    role: 'Admin',
    gender: 'male'
  },
  {
    firstName: 'Adeola',
    lastName: 'Tracy',
    email: 'hosiv4856@gmail.com',
    role: 'user',
    gender: 'female'
  }
];

export const UsersTable = ({ disable }) => {
  const { Modal, showModal } = useModal();
  const [userDetails, setUserDetails] = useState(null);
  const actionItems = (details) => [
    {
      name: 'Edit',
      action: () => {}
    },
    {
      name: 'Disable',
      action: disable
    },
    {
      name: 'Manage privilege',
      action: () => {
        setUserDetails(details);
        showModal();
      }
    }
  ];
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div className="flex items-center">
                        <Avatar name={`${user.firstName} ${user.lastName}`} />
                        <span className="pl-3">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.gender}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <SplitButton
                        buttonText="View"
                        items={actionItems(`${user.firstName} ${user.lastName}`)}
                        mainButtonAction={() => {}}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {Modal({
          children: <SwitchRoles userName={userDetails} avatar={<Avatar name={userDetails} />} />,
          showCloseIcon: true
        })}
      </div>
    </div>
  );
};
