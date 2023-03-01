import { ForgotPassword } from 'pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from 'pages/Auth/ResetPassword/ResetPassword';
import { Login } from 'pages/Auth/Login/Login';
import { VerifyAccount } from 'pages/Auth/VerifyAccount/VerifyAccount';
import { DeleteCorperateAuth } from 'pages/Auth/DeleteCorperate/DeleteCorperateAuth';
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
    path: 'deletecorperateauth',
    element: <DeleteCorperateAuth/>
  }
];

export { routes as authRoutes };
