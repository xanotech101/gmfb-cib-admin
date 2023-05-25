import { Avatar } from 'components/Avatar/Avatar';
import { SplitButton } from 'components/Button/SplitButton';
import { useModal, usePrivilege } from 'hooks';
import { useState } from 'react';
import CorporateDetails from './CorporateDetails';
import SwitchRoles from '../User/SwitchRoles/SwitchRoles';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from 'services';

export const UsersTable = ({ users }) => {
  const { Modal, showModal } = useModal();
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [viewUsers, setViewUsers] = useState('');
  const navigate = useNavigate();
  const { hasPrivilege } = usePrivilege();

  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });

  const hasAdminPrivilege = !!hasPrivilege(['admin']);
  const actionItems = (name, user) => [
    ...(hasAdminPrivilege
      ? [
          {
            name: 'Edit',
            action: () => {
              navigate(`/settings/corporate-users/${user._id}/edit-user`);
            }
          },
          {
            name: 'Manage privilege',
            action: () => {
              setUser(user);
              setUserDetails(name);
              showModal();
              setViewUsers('');
            }
          },
          ...(!user?.isVerified
            ? [{ name: 'Resend Verification Link', action: () => mutate(user.email) }]
            : [])
        ]
      : [])
  ];

  const handleView = (e) => {
    setViewUsers(e);
    showModal();
    setUserDetails('');
  };

  return (
    <div className="mt-8 flex flex-col overflow-x-auto">
      <div className="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 ">
          <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className=" py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user, i) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{i + 1}</td>
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
                    <td className=" whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <SplitButton
                        buttonText="View"
                        items={actionItems(`${user.firstName} ${user.lastName}`, user)}
                        mainButtonAction={() => {
                          handleView(<CorporateDetails user={user} />);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {Modal({
          children: viewUsers ? (
            viewUsers
          ) : (
            <SwitchRoles
              userName={userDetails}
              user={user}
              avatar={<Avatar name={userDetails} />}
            />
          ),
          showCloseIcon: true,
          size: 'md'
        })}
      </div>
    </div>
  );
};
