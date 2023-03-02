import React from 'react';
import { Container } from 'components/Container/Container';
import { NavLink } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';
export const SettingsWrapper = ({ children }) => {
  return (
    <div className="p-4 my-4 lg:p-9">
      <Container>
        <Heading>
          Settings
          <p className="text-sm text-gray-500 mt-2">Kindly make your changes below.</p>
        </Heading>
        <div className="flex gap-4 font-medium capitalize">
          <NavLink
            to="settings/general"
            className={({ isActive }) => (isActive ? 'grooming-text border-bottom' : '')}>
            General
          </NavLink>
          <NavLink
            to="settings/security"
            className={({ isActive }) => (isActive ? 'grooming-text border-bottom ' : '')}>
            Security
          </NavLink>

          <NavLink
            to="settings/corporate-users"
            className={({ isActive }) => (isActive ? 'grooming-text border-bottom' : '')}>
            Corporate user
          </NavLink>
        </div>
        <div>{children}</div>
      </Container>
    </div>
  );
};
