import { useIdleTimer } from 'react-idle-timer';
import { useLogout } from './useLogout';

export const useInactivity = () => {
  const { handleLogout } = useLogout();

  const { reset } = useIdleTimer({
    timeout: 500 * 60 * 1000,
    onIdle: () => handleLogout({ message: 'You have been logged out due to inactivity' }),
    debounce: 500
  });

  return { reset };
};
