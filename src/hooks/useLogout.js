import { useNavigate } from 'react-router-dom';
import { useStore } from './useStore';

export const useLogout = () => {
  const { setState } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    setState({ user: null });
  };

  return { handleLogout };
};
