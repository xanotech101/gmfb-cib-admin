import { useStore } from './useStore';

export const useRole = () => {
  const { user } = useStore();
  const isSystemAdmin = user?.role === 'system-admin';
  const isGcAdmin = user?.role === 'gcadmin';

  return { isSystemAdmin, isGcAdmin };
};
