import { useStore } from 'hooks';
import { useCallback } from 'react';

export const usePrivilege = () => {
  const { user } = useStore();
  const hasPrivilege = useCallback(
    (privileges) => {
      if (!user?.privileges) return false;
      const userPrivileges = user.privileges.map((privilege) => privilege.name);
      return privileges.every((privilege) => userPrivileges.includes(privilege));
    },
    [user]
  );

  return { hasPrivilege };
};
