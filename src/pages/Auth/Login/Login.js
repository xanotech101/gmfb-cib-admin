import { Auth } from 'components/Layout';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <Auth title="Sign in to your account">
      <LoginForm />
    </Auth>
  );
};
