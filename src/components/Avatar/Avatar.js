import { getRandomColor, getInitials } from 'utils';
import { useMemo } from 'react';

export const Avatar = ({ name }) => {
  const bgColor = useMemo(() => getRandomColor(name), [name]);
  return (
    <span
      className={`relative z-30 inline-flex h-8 w-8 items-center justify-center rounded-full ${bgColor}`}
    >
      <span className="text-xs font-medium leading-none text-white">{getInitials(name)}</span>
    </span>
  );
};
