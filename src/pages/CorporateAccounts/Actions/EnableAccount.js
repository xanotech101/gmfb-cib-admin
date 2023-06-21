import { Button } from 'components/Button/Button';
import GenerateOtp from './GenerateOtp';
import { useAccount } from 'hooks/useAccounts';

export const EnableAccount = ({ closeModal, account, otp, setOtp, refetch }) => {
  const { enableAccount } = useAccount(refetch);

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Enable {account?.adminID?.firstName} Account
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to enable this user? This user will be able to login to the
              system.
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <GenerateOtp setOtp={setOtp} type="enableAccountOtp" otp={otp}>
        <div className="flex mt-6 space-x-2">
          <Button
            variant="success"
            onClick={() => enableAccount.mutate({ id: account?._id, otp, successCb: closeModal })}
            disabled={enableAccount.isLoading}>
            Enable
          </Button>
          <Button variant="outline" onClick={closeModal} disabled={enableAccount.isLoading}>
            Cancel
          </Button>
        </div>
      </GenerateOtp>
    </div>
  );
};
