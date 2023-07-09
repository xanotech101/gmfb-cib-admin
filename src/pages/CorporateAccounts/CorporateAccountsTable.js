import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Avatar } from 'components/Avatar/Avatar';
import { EnableAccount } from './Actions/EnableAccount';
import { DisableAccount } from './Actions/DisableAccount';
import { useModal } from 'hooks';
import { useState } from 'react';
import { Badge } from 'components/Badge/Badge';
import { useCallback } from 'react';
const actionTypes = {
  ENABLE_ACCOUNT: 'ENABLE_ACCOUNT',
  DISABLE_ACCOUNT: 'DISABLE_ACCOUNT'
};

const Action = ({ account, actionType, cancel, otp, setOtp, refetch }) => {
  switch (actionType) {
    case actionTypes.ENABLE_ACCOUNT:
      return (
        <EnableAccount
          account={account}
          closeModal={cancel}
          otp={otp}
          setOtp={setOtp}
          refetch={refetch}
        />
      );
    case actionTypes.DISABLE_ACCOUNT:
      return (
        <DisableAccount
          account={account}
          closeModal={cancel}
          setOtp={setOtp}
          otp={otp}
          refetch={refetch}
        />
      );
  }
};
export const CorporateAccountsTable = ({ data, initialSerialNumber, refetch }) => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const [account, setAccount] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [otp, setOtp] = useState(null);

  const getAccountStatus = useCallback((isDisabled) => {
    return isDisabled ? 'disabled' : 'active';
  }, []);

  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="relative lg:overflow-hidden overflow-x-scroll mt-6">
        <table className="w-full text-left text-sm  text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase border text-black">
            <tr>
              <th scope="col" className="p-3">
                S/N
              </th>
              <th scope="col" className="p-3">
                Account Name
              </th>
              <th scope="col" className="p-3">
                Admin
              </th>
              <th scope="col" className="p-3">
                Status
              </th>
              <th scope="col" className="p-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
            {data?.map((datum, i) => (
              <tr key={datum._id}>
                <td className="whitespace-nowrap p-3  border">{initialSerialNumber + i}</td>
                <td className="whitespace-nowrap p-3 border">{datum.accountName}</td>
                <td className="whitespace-nowrap p-3 border">
                  <div className="flex items-start">
                    <Avatar name={`${datum.adminID?.firstName} ${datum.adminID?.lastName}`} />
                    <div className="pl-3">
                      <div className="text-gray-900 font-semibold capitalize break-words">
                        {datum.adminID?.firstName} {datum.adminID?.lastName}
                      </div>
                      {datum.adminID?.email}
                    </div>
                  </div>
                </td>
                <td className="p-3 border capitalize">
                  <Badge status={getAccountStatus(datum?.disabled)}>
                    {getAccountStatus(datum?.disabled)}
                  </Badge>
                </td>
                <td className="whitespace-nowrap p-3 text-sm border">
                  <Dropdown
                    label={<EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />}
                    inline={true}
                    arrowIcon={false}>
                    <Dropdown.Item
                      onClick={() => {
                        navigate(`/accounts/${datum._id}/overview`);
                      }}>
                      View details
                    </Dropdown.Item>
                    {datum?.disabled ? (
                      <Dropdown.Item
                        className="text-green-500"
                        onClick={() => {
                          setAccount(datum);
                          setOtp(null);
                          setActionType(actionTypes.ENABLE_ACCOUNT);
                          showModal();
                        }}>
                        Enable
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        className="text-red-500"
                        onClick={() => {
                          setAccount(datum);
                          setOtp(null);
                          setActionType(actionTypes.DISABLE_ACCOUNT);
                          showModal();
                        }}>
                        Disable
                      </Dropdown.Item>
                    )}
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Modal({
        children: (
          <Action
            account={account}
            actionType={actionType}
            cancel={showModal}
            otp={otp}
            setOtp={setOtp}
            refetch={refetch}
          />
        )
      })}
    </div>
  );
};
