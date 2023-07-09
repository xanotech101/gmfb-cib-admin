import { useIdleTimer } from 'react-idle-timer';
import { useLogout } from './useLogout';

/**
 * Tracks user inactivity and logs them out after 5 minutes
 *
 * @return {*}
 */
export const useInactivity = () => {
  const { handleLogout } = useLogout();

  const { reset } = useIdleTimer({
    timeout: 5 * 60 * 1000,
    onIdle: () => handleLogout({ message: 'You have been logged out due to inactivity' }),
    debounce: 500
  });

  return { reset };
};
