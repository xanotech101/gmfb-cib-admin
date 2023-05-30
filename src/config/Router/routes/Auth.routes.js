import { ForgotPassword } from 'pages/Auth/ForgotPassword/ForgotPassword';
import { ResetPassword } from 'pages/Auth/ResetPassword/ResetPassword';
import { Login } from 'pages/Auth/Login/Login';

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
  }
];

export { routes as authRoutes };
