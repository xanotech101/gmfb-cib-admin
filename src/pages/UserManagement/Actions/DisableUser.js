import { Button } from 'components/Button/Button';
import GenerateOtp from './GenerateOtp';
import { useUsers } from 'hooks/useUsers';

export const DisableUser = ({ closeModal, user, switchUsers, setOtp, otp }) => {
  const { disableUser } = useUsers();
  const { mutate, isLoading } = disableUser;

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Disable {user?.firstName}&#39; Account
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to disable this user? This user will not be able to login to the
              system.
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <GenerateOtp setOtp={setOtp} type="disableUserOtp" otp={otp}>
        <div className="flex mt-6 space-x-2">
          <Button
            variant="danger"
            onClick={() =>
              mutate({
                id: user._id,
                otp,
                successCb: closeModal,
                switchUsers
              })
            }
            disabled={disableUser.isLoading}>
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
