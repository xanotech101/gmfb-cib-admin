import { useCallback, useState } from 'react';
import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from 'hooks';
import { Badge } from 'components/Badge/Badge';

import Enabled from '../Actions/Enable';
import GenerateOtp from '../Actions/GenerateOtp';
import { EnableAccount } from 'services/enableDisable';
import { useNavigate } from 'react-router-dom';
import { notification } from 'utils';

export const UserManagementTable = ({ users, initialSerialNumber }) => {
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });

  const queryClient = useQueryClient();

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

  const getUserStatus = useCallback((isDisabled) => {
    return isDisabled ? 'disabled' : 'active';
  }, []);

  return (
    <>
      <div role="list" className="divide-y divide-gray-200">
        <div className="relative overflow-hidden">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs bg-gray-100 uppercase border text-black font-semibold">
              <tr>
                <th scope="col" className="p-3">
                  S/N
                </th>
                <th scope="col" className="p-3">
                  Name
                </th>
                <th scope="col" className="p-3">
                  Gender
                </th>
                <th scope="col" className="p-3">
                  Role
                </th>
                <th scope="col" className="p-3">
                  Status
                </th>
                <th scope="col" className="p-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
              {users?.map((user, i) => (
                <tr key={user?.email}>
                  <td className="p-3 border">{initialSerialNumber + i}</td>
                  <td className="p-3 border whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar name={`${user?.firstName} ${user?.lastName}`} />
                      <div className="pl-3">
                        <div className="text-gray-900 font-semibold capitalize break-words">
                          {user?.firstName} {user?.lastName}
                        </div>
                        {user?.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border break-words capitalize">{user?.gender}</td>
                  <td className="p-3 border break-words">{user?.role}</td>
                  <td className="p-3 border capitalize">
                    <Badge status={getUserStatus(user?.disabled)}>
                      {getUserStatus(user?.disabled)}
                    </Badge>
                  </td>
                  <td className="p-3 border">
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
                          setToggle(null);
                        }}>
                        View profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setToggle(false);
                          setUser(user);
                          setIndex(i);
                          showModal();
                        }}>
                        Enable user
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setToggle(true);
                          setUser(user);
                          setIndex(i);
                          showModal();
                        }}>
                        Disable user
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {Modal({
        children: (
          <>
            {toggle === true ? (
              <GenerateOtp userid={user?._id} user={user} users={users} />
            ) : toggle === false ? (
              <Enabled
                enable={() => {
                  handleClick(index);
                  Enable.mutate(user?._id);
                }}
                cancel={() => {
                  showModal();
                }}
              />
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
        )
      })}
    </>
  );
};
