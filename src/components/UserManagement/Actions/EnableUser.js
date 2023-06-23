import { Button } from 'components/Button/Button';
import GenerateOtp from './GenerateOtp';
import { useUsers } from 'hooks/useUsers';

export const EnableUser = ({ closeModal, user, otp, setOtp, refetch }) => {
  const { enableUser } = useUsers(refetch);

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Enable {user?.firstName}&#39;s Account
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
      <GenerateOtp setOtp={setOtp} type="enableUserOtp" otp={otp}>
        <div className="flex mt-6 space-x-2">
          <Button
            variant="success"
            onClick={() => enableUser.mutate({ id: user._id, otp, successCb: closeModal })}
            disabled={enableUser.isLoading}>
            Enable
          </Button>
          <Button variant="outline" onClick={closeModal} disabled={enableUser.isLoading}>
            Cancel
          </Button>
        </div>
      </GenerateOtp>
    </div>
  );
};
