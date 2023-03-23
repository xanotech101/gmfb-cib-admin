import { ForgotPassword } from 'pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from 'pages/Auth/ResetPassword/ResetPassword';
import { Login } from 'pages/Auth/Login/Login';
import { VerifyAccount } from 'pages/Auth/VerifyAccount/VerifyAccount';
import { AdminVerifyAccount } from 'pages/CorporateAccount/VerifyAccount';
import { CreateSecurityQuestion } from 'pages/Auth/CreateSecurityQuestion/CreateSecurityQuestion';

const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />
  },
  {
    path: 'reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: 'verify-account/:token',
    element: <VerifyAccount />
  },
  {
    path: 'auth/create-security-questions',
    element: <CreateSecurityQuestion />
  },
  {
    path: 'admin/verify-account/:token',
    element: <AdminVerifyAccount />
  }
];

export { routes as authRoutes };
