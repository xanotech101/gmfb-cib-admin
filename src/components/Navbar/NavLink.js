import React from 'react';
import { Link } from 'react-router-dom';
export const NavLink = (props) => {
  const { to, name, icon, current,onClick,children} = props;
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div>
      <Link
        to={to}
        className={classNames(
          current ? 'grooming-color2 text-white' : 'text-white grooming-color2',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
        )} onClick={onClick}
      >
        <span className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true">
          {icon}
        </span>
        {name}
        {children}
      </Link>
    </div>
  );
};
