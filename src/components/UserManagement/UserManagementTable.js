import { useCallback, useState } from 'react';
import { Avatar } from 'components/Avatar/Avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Dropdown } from 'flowbite-react';
import { authService } from 'services';
import { useMutation } from '@tanstack/react-query';
import { useModal } from 'hooks';
import { Badge } from 'components/Badge/Badge';
import { UserDetails } from './UserDetails';
import { EnableUser } from './Actions/EnableUser';
import { DisableUser } from './Actions/DisableUser';
import { SwitchUser } from './Actions/SwitchUser';
import { UpdateEmail } from './Actions/UpdateEmail';
import { isSystemAdmin } from 'utils/getUserRole.js';

const actionTypes = {
  VIEW_PROFILE: 'VIEW_PROFILE',
  ENABLE_USER: 'ENABLE_USER',
  DISABLE_USER: 'DISABLE_USER',
  SWITCH_USERS: 'SWITCH_USERS',
  UPDATE_EMAIL: 'UPDATE_EMAIL'
};

const Action = ({ user, actionType, cancel, setActionType, otp, setOtp, refetch }) => {
  switch (actionType) {
    case actionTypes.VIEW_PROFILE:
      return <UserDetails user={user} />;
    case actionTypes.ENABLE_USER:
      return (
        <EnableUser user={user} closeModal={cancel} otp={otp} setOtp={setOtp} refetch={refetch} />
      );
    case actionTypes.DISABLE_USER:
      return (
        <DisableUser
          user={user}
          closeModal={cancel}
          switchUsers={() => setActionType(actionTypes.SWITCH_USERS)}
          setOtp={setOtp}
          otp={otp}
          refetch={refetch}
        />
      );
    case actionTypes.UPDATE_EMAIL:
      return (
        <UpdateEmail user={user} closeModal={cancel} otp={otp} setOtp={setOtp} refetch={refetch} />
      );
    default:
      return (
        <SwitchUser
          outgoingUser={user}
          closeModal={cancel}
          otp={otp}
          setOtp={setOtp}
          refetch={refetch}
        />
      );
  }
};

export const UserManagementTable = ({ users, initialSerialNumber, refetch }) => {
  const { Modal, showModal } = useModal();
  const [user, setUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [otp, setOtp] = useState(null);

  const { mutate } = useMutation({
    mutationFn: (email) => authService.resendVerificationLink(email)
  });

  const getUserStatus = useCallback((isDisabled) => {
    return isDisabled ? 'disabled' : 'active';
  }, []);

  return (
    <>
      <div role="list" className="divide-y divide-gray-200">
        <div className="relative  lg:overflow-hidden overflow-x-scroll">
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
                <tr key={user?.email} className="hover:bg-gray-50">
                  <td className="p-3 border">{initialSerialNumber + i}</td>
                  <td className="p-3 border whitespace-nowrap">
                    <div className="flex items-start">
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
                          Resend verification link
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onClick={() => {
                          setUser(user);
                          setActionType(actionTypes.VIEW_PROFILE);
                          showModal();
                        }}>
                        View profile
                      </Dropdown.Item>
                      {isSystemAdmin() && (
                        <Dropdown.Item
                          onClick={() => {
                            setUser(user);
                            setOtp(null);
                            setActionType(actionTypes.UPDATE_EMAIL);
                            showModal();
                          }}>
                          Update Email
                        </Dropdown.Item>
                      )}
                      {user?.disabled ? (
                        <Dropdown.Item
                          onClick={() => {
                            setUser(user);
                            setOtp(null);
                            setActionType(actionTypes.ENABLE_USER);
                            showModal();
                          }}>
                          <span className="text-green-600">Enable</span>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item
                          onClick={() => {
                            setUser(user);
                            setOtp(null);
                            setActionType(actionTypes.DISABLE_USER);
                            showModal();
                          }}>
                          <span className="text-red-600">Disable</span>
                        </Dropdown.Item>
                      )}
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
          <Action
            user={user}
            actionType={actionType}
            cancel={showModal}
            setActionType={setActionType}
            otp={otp}
            setOtp={setOtp}
            refetch={refetch}
          />
        )
      })}
    </>
  );
};
