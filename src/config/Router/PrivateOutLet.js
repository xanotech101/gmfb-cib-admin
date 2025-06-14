import { useInactivity } from 'hooks/useInactivity';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateOutlet = () => {
  useInactivity();
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
