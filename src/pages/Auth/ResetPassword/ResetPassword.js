import { Auth } from 'components/Layout';
import { ResetPasswordForm } from './ResetPasswordForm';

export const ResetPassword = () => {
  return (
    <Auth title="Create New Password">
      <ResetPasswordForm />
    </Auth>
  );
};
