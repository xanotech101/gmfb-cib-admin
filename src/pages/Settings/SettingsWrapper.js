import React from 'react';
import { Container } from 'components/Container/Container';
import { NavLink } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';
export const SettingsWrapper = ({ children }) => {
  return (
    <div className="p-5">
      <Container>
        <Heading>
          Settings
          <p className="text-sm text-gray-500 mt-2">Kindly make your changes below.</p>
        </Heading>
        <div className="flex gap-4 font-medium capitalize my-4 border py-3 fit rounded shadow bg-gray-100">
          <NavLink
            to="settings/general"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            General
          </NavLink>
          <NavLink
            to="settings/security"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Security
          </NavLink>

          <NavLink
            to="settings/corporate-users"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Corporate user
          </NavLink>
        </div>
        <div>{children}</div>
      </Container>
    </div>
  );
};
