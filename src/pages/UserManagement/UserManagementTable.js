import { useState } from 'react';
import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation } from '@tanstack/react-query';
import { useModal } from 'hooks';
import { Badge } from 'components/Badge/Badge';

export const UserManagementTable = ({ users }) => {
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState(null);
  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });

  return (
    <>
      <div className="flex flex-col mt-6">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Account
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
                  {users?.map((user, i) => (
                    <tr key={user?.email}>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{i + 1}</td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <Avatar name={`${user?.firstName} ${user?.lastName}`} />
                          <span className="pl-3">
                            {user?.firstName} {user?.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user?.organizationId?.accountName ?? ' '}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user?.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {user?.gender}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {user?.role}
                      </td>
                      <td>
                        <Dropdown
                          label={<EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />}
                          inline={true}
                          arrowIcon={false}>
                          {!user.isVerified && (
                            <Dropdown.Item onClick={() => mutate(user.email)}>
                              Resend Verification link
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item
                            onClick={() => {
                              setUser(user);
                              showModal();
                            }}>
                            View profile
                          </Dropdown.Item>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {Modal({
        children: (
          <div className="space-y-6">
            <h1 className="font-medium text-xl">Corporate user details</h1>
            <hr />
            <div className="flex items-center justify-between">
              <p>Name</p>
              <p>
                <Avatar name={`${user?.firstName} ${user?.lastName}`} />
                <span className="ml-4 capitalize">
                  {' '}
                  {user?.firstName} {user?.lastName}
                </span>
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p>Account</p>
              <p> {user?.organizationId?.accountName}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p>Email</p>
              <p> {user?.email}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p>Phone number</p>
              <p> {user?.phone}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p>Gender</p>
              <p className="capitalize">{user?.gender}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <p>Role</p>
              <p className="capitalize">{user?.role}</p>
            </div>
            <hr />
            <div className="flex flex-col">
              <p>Privileges</p>
              <p className="capitalize flex flex-wrap">
                {user?.privileges?.map((privilege) => (
                  <p key={privilege.name} className="mr-2 mt-3">
                    <Badge status="approved">{privilege.name}</Badge>
                  </p>
                ))}
              </p>
            </div>
          </div>
        ),
        showCloseIcon: true,
        size: 'md'
      })}
    </>
  );
};
