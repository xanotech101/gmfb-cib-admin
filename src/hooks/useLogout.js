import { useNavigate } from 'react-router-dom';
import { useStore } from './useStore';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = (state = {}) => {
    useStore.setState({ user: null });
    localStorage.removeItem('token');
    navigate('/', { replace: true, state });
  };
  return { handleLogout };
};
