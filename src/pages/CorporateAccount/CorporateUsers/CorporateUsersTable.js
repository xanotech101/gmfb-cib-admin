import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from 'hooks';
import { SubHeading } from 'components/Header/SubHeading';
import { Button } from 'components/Button/Button';
import { DeleteUser } from 'services/delete';
import { useState } from 'react';
export const CorporateUsersTable = ({ users, initialSerialNumber }) => {
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState(null);
  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });
  const queryClient = useQueryClient();

  const deletePost = useMutation(
    (userid) => {
      DeleteUser(userid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-users');
        console.log('deleted');
      },
      onError: ({ message }) => {
        alert(message);
      }
    }
  );
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
                    Delete user
                  </Dropdown.Item>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Modal({
        children: (
          <>
            <div className="text-center ">
              <SubHeading>Are you sure you want to delete this user?</SubHeading>
              <p className="mt-4">Note this change is irreversible</p>
              <div className="flex justify-center items-center mt-4 gap-6">
                <Button
                  variant="danger"
                  onClick={() => {
                    deletePost.mutate(user?._id);
                    showModal();
                  }}>
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    showModal();
                  }}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        ),
        showCloseIcon: true,
        size: 'md'
      })}
    </div>
  );
};
