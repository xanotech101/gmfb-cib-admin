import React from 'react';
import { Container } from 'components/Container/Container';
import { NavLink } from 'react-router-dom';

export const SettingsWrapper = ({ children }) => {
  return (
    <div className="p-5">
      <Container>
        <div className="flex gap-4 font-medium capitalize my-4 border py-3 fit rounded shadow bg-gray-100">
          <NavLink
            to="settings/security"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Security
          </NavLink>
        </div>
        <div>{children}</div>
      </Container>
    </div>
  );
};
