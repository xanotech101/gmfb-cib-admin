import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation } from '@tanstack/react-query';
import { Badge } from 'components/Badge/Badge';
import { useCallback } from 'react';

export const CorporateUsersTable = ({ users, initialSerialNumber }) => {
  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });
  const getUserStatus = useCallback((isDisabled) => {
    return isDisabled ? 'disabled' : 'active';
  }, []);

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
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users?.map((user, i) => (
            <tr key={user.email}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {initialSerialNumber + i}
              </td>
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
              <td className="px-3 py-4 text-sm text-gray-500 border">
                <Badge status={getUserStatus(user?.disabled)}>
                  {getUserStatus(user?.disabled)}
                </Badge>
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
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
