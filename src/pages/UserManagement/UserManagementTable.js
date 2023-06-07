import { useState } from 'react';
import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from 'hooks';
import { Badge } from 'components/Badge/Badge';
import { DeleteUser } from 'services/delete';
import { SubHeading } from 'components/Header/SubHeading';
import { Button } from 'components/Button/Button';
import { DisableAccount, EnableAccount } from 'services/enableDisable';
import { notification } from 'utils';
import { useNavigate } from 'react-router-dom';

export const UserManagementTable = ({ users, initialSerialNumber, page, isSystemAdmin }) => {
  console.log(users);
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
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
        navigate('/user-management');
      },
      onError: ({ message }) => {
        alert(message);
      }
    }
  );

  const Disable = useMutation(
    (userid) => {
      DisableAccount(userid);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('all-users', page, isSystemAdmin);
        navigate('/user-management');
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
        navigate('/user-management');
      },
      onError: ({ message }) => {
        queryClient.invalidateQueries('all-users');
        notification(message);
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
    <>
      <div className="flex flex-col mt-6">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 w-[5%]">
                      S/N
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 w-[15%]">
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[10%]">
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[7%]">
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[5%]">
                      Status
                    </th>
                    <th scope="col" className=" py-3.5 px-4 w-[5%]">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users?.map((user, i) => (
                    <tr key={user?.email}>
                      <td className=" px-3 py-4 text-sm text-gray-500 border">
                        {initialSerialNumber + i}
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500 border">
                        <div className="flex items-center">
                          <Avatar name={`${user?.firstName} ${user?.lastName}`} />
                          <span className="pl-3">
                            {user?.firstName} {user?.lastName}
                          </span>
                        </div>
                        <div className="mt-2"> {user?.email}</div>
                      </td>

                      <td className="px-3 py-4 text-sm text-gray-500 border break-words">
                        {user?.gender}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 border break-words">
                        {user?.role}
                      </td>
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
                      <td className="px-3 py-4 text-sm text-gray-500 border">
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
                              setAlert(false);
                              setToggle(null);
                            }}>
                            View profile
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              showModal();
                              setUser(user);
                              setAlert(true);
                              setToggle(null);
                            }}>
                            Delete user
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setToggle(false);
                              setAlert(false);
                              setUser(user);
                              setIndex(i);
                              showModal();
                            }}>
                            <span
                              className={`${
                                user?.disabled === false ? 'bg-green-300  rounded p-1' : ''
                              }`}>
                              {' '}
                              Enable user
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setAlert(false);
                              setToggle(true);
                              setUser(user);
                              setIndex(i);
                              showModal();
                            }}>
                            <span
                              className={`${
                                user?.disabled === true ? 'bg-red-300  rounded p-1' : ''
                              }`}>
                              Disable user
                            </span>
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
          <>
            {alert === true ? (
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
            ) : toggle === true ? (
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
                <p className="mt-4">please be sure you want to enable user</p>
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
                  <div className="capitalize flex flex-wrap">
                    {user?.privileges?.map((privilege) => (
                      <p key={privilege.name} className="mr-2 mt-3">
                        <Badge status="approved">{privilege.name}</Badge>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ),
        showCloseIcon: true,
        size: 'md'
      })}
    </>
  );
};
