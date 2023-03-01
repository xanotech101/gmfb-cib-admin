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
        <div className="flex gap-3 font-medium capitalize my-8">
          <NavLink
            to="settings/general"
            className={({ isActive }) =>
              isActive ? 'text-indigo-500 border-b-4 border-indigo-500' : ''
            }>
            General
          </NavLink>
          <NavLink
            to="settings/security"
            className={({ isActive }) =>
              isActive ? 'text-indigo-500 border-b-4 border-indigo-500 ' : ''
            }>
            Security
          </NavLink>

          <NavLink
            to="settings/corporate-users"
            className={({ isActive }) =>
              isActive ? 'text-indigo-500  border-b-4 border-indigo-500' : ''
            }>
            Corporate user
          </NavLink>
        </div>
        <div>{children}</div>
      </Container>
    </div>
  );
};
