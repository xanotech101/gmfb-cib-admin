const userRole = () => {
  try {
    const role = localStorage.getItem('cib-role');
    return role ?? null;
  } catch (error) {
    throw new Error(error);
  }
};

export const isSystemAdmin = () => {
  const role = userRole();
  return role === 'system-admin';
};

export const organizationLabel = () => {
  const role = userRole();
  return role === 'entity';
};
