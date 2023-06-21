import { Button } from 'components/Button/Button';
import GenerateOtp from './GenerateOtp';

import { useAccount } from 'hooks/useAccounts';

export const DisableAccount = ({ closeModal, account, setOtp, otp, refetch }) => {
  const { disableAccount } = useAccount(refetch);
  const { mutate, isLoading } = disableAccount;

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Disable {account?.adminID?.firstName} Account
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to disable this Account? This account will not be able to login
              to the system.
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <GenerateOtp setOtp={setOtp} type="disableAccountOtp" otp={otp}>
        <div className="flex mt-6 space-x-2">
          <Button
            variant="danger"
            onClick={() =>
              mutate({
                id: account?._id,
                otp,
                successCb: closeModal
              })
            }
            disabled={disableAccount.isLoading}>
            Disable
          </Button>
          <Button variant="outline" onClick={closeModal} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </GenerateOtp>
    </div>
  );
};
