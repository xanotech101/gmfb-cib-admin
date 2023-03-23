import { NavItem } from 'components/Navbar/NavItem';
import { Sidebar } from 'components/Navbar/Sidebar';
import React from 'react';

export const AuthLayout = (prop) => {
  const { children } = prop;
  return (
    <div>
      <Sidebar mobile={<NavItem/>} desktop={<NavItem/>}/>
      <div className="Home">{children}</div>
    </div>
  );
};
