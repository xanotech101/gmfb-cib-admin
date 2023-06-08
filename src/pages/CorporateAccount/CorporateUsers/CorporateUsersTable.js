import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from 'hooks';
import { SubHeading } from 'components/Header/SubHeading';
import { Button } from 'components/Button/Button';
// import { DeleteUser } from 'services/delete';
import { useState } from 'react';
import { DisableAccount, EnableAccount } from 'services/enableDisable';
import { Badge } from 'components/Badge/Badge';
import { useNavigate, useParams } from 'react-router-dom';
export const CorporateUsersTable = ({ users, initialSerialNumber, page, isSystemAdmin }) => {
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState(null);
  // const [alert, setAlert] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });
  const queryClient = useQueryClient();

  // const deletePost = useMutation(
  //   (userid) => {
  //     DeleteUser(userid);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('all-users');
  //       navigate(`/accounts/${id}/users`);
  //     },
  //     onError: () => {}
  //   }
  // );
  const Disable = useMutation(
    (userid) => {
      DisableAccount(userid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-users', page, isSystemAdmin);
        navigate(`/accounts/${id}/users`);
      },
      onError: () => {
        queryClient.invalidateQueries('all-users');
      }
    }
  );

  const Enable = useMutation(
    (userid) => {
      EnableAccount(userid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-users');
        navigate(`/accounts/${id}/users`);
      },
      onError: () => {
        queryClient.invalidateQueries('all-users');
      }
    }
  );

  const handleClick = (index) => {
    if (index && toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
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
                {user?.disabled ? (
                  <span className="flex items-center gap-2 text-red-600">
                    <Badge status="disabled"> Disabled</Badge>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-green-600">
                    <Badge status="enabled">Active</Badge>
                  </span>
                )}
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

                  {/* <Dropdown.Item
                    onClick={() => {
                      showModal();
                      setUser(user);
                      setAlert(true);
                      setToggle(null);
                    }}>
                    Delete user
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    onClick={() => {
                      setToggle(false);

                      setUser(user);
                      setIndex(i);
                      showModal();
                    }}>
                    <span
                      className={`${user?.disabled === false ? 'bg-green-300  rounded p-1' : ''}`}>
                      {' '}
                      Enable
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setToggle(true);
                      setUser(user);
                      setIndex(i);
                      showModal();
                    }}>
                    <span className={`${user?.disabled === true ? 'bg-red-300  rounded p-1' : ''}`}>
                      Disable
                    </span>
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
            {toggle === true ? (
              <div className="text-center ">
                <SubHeading>Are you sure you want to disable this user?</SubHeading>
                <p className="mt-4">Note this will stop the user from performing any action </p>
                <div className="flex justify-center items-center mt-4 gap-6">
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleClick(index);
                      Disable.mutate(user?._id);
                      showModal();
                    }}>
                    Disable
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
            ) : toggle === false ? (
              <div className="text-center ">
                <SubHeading>Do you want to enable this user?</SubHeading>
                <p className="mt-4">Please be sure you want to enable this user</p>
                <div className="flex justify-center items-center mt-4 gap-6">
                  <Button
                    variant="success"
                    onClick={() => {
                      handleClick(index);
                      Enable.mutate(user?._id);
                      showModal();
                    }}>
                    Enable
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
            ) : (
              ''
            )}
          </>
        ),
        showCloseIcon: true,
        size: 'md'
      })}
    </div>
  );
};
