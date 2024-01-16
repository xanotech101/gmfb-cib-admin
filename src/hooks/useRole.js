import { useStore } from './useStore';

export const useRole = () => {
  const { user } = useStore();
  const isSystemAdmin = user?.role === 'system-admin';
  const organizationLabel = user?.role === 'entity';

  return { isSystemAdmin, organizationLabel };
};
