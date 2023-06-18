import { ForgotPassword } from 'pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from 'pages/Auth/ResetPassword/ResetPassword';
import { Login } from 'pages/Auth/Login/Login';
import Disabled from 'pages/Auth/Disabled/Disabled';

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
    path: 'auth/disabled-account',
    element: <Disabled />
  }
];

export { routes as authRoutes };
