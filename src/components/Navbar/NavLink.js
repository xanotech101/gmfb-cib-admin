import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavLinks = (props) => {
  const { to, name, icon, onClick, children } = props;
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'grooming-color3  text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-5 relative'
            : 'group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white mt-4 relative'
        }
        onClick={onClick}
      >
        <span className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true">
          {icon}
        </span>
        {name}
        {children}
      </NavLink>
    </div>
  );
};
