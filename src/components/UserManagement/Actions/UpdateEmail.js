import { Button } from 'components/Button/Button';
import GenerateOtp from './GenerateOtp';
import { useUsers } from 'hooks/useUsers';
import { Input } from 'components/Form/Input/Input';
import { useForm } from 'react-hook-form';

export const UpdateEmail = ({ closeModal, user, otp, setOtp, refetch }) => {
  const { updateUserEmail } = useUsers(refetch);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    updateUserEmail.mutate({
      email: user.email,
      otp,
      newEmail: data.newEmail,
      successCb: closeModal
    });
  };

  return (
    <div>
      <div className="sm:flex sm:items-start">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Update {user?.firstName}&#39;s email address
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to update this {`user's`} email address?
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <GenerateOtp setOtp={setOtp} otp={otp} payload={{ context: 'edit email' }}>
        <div className="mt-6 space-y-2">
          <Input label="Current Email" id="current_user" disabled defaultValue={user.email} />
          <Input
            label="New Email"
            {...register('newEmail', { required: true })}
            error={errors.lastName && 'Email is required'}
          />
          <div className="flex space-x-2 pt-6">
            <Button
              variant="success"
              type="submit"
              disabled={updateUserEmail.isLoading}
              onClick={() => {
                setOtp(null);
                handleSubmit(onSubmit)();
              }}>
              Update Email
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={closeModal}
              disabled={updateUserEmail.isLoading}>
              Cancel
            </Button>
          </div>
        </div>
      </GenerateOtp>
    </div>
  );
};
