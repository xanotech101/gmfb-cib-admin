import { getRandomColor, getInitials } from 'utils';
import { useMemo } from 'react';

export const Avatar = ({ name, size = '32', textSize = '12' }) => {
  const bgColor = useMemo(() => getRandomColor(name), [name]);
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full ${bgColor}`}
      style={{
        height: `${size}px`,
        width: `${size}px`
      }}>
      <span
        className="text-xs font-medium leading-none text-white"
        style={{
          fontSize: `${textSize}px`
        }}>
        {getInitials(name)}
      </span>
    </span>
  );
};
