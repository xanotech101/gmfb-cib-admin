import { useNavigate } from 'react-router-dom';
import { useStore } from './useStore';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    useStore.setState({ user: null });
  };

  return { handleLogout };
};
