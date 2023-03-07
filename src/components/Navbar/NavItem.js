import React from 'react';
import {
  HomeIcon,
  CogIcon,
  BriefcaseIcon,
  DocumentMagnifyingGlassIcon,
  ChartPieIcon,
  ArrowLeftOnRectangleIcon,
  RocketLaunchIcon,
  UserIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { NavLinks } from './NavLink';
import { DropDown } from 'components/DropDown/DropDown';
import { DropDownItems } from 'components/DropDown/DropDownItems';
import { Link, NavLink } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const NavItem = () => {
  return (
    <div>
      <nav className="flex-1 space-y-1 px-2 pb-4">
        <NavLinks to="/dashboard" name="Dashboard" icon={<HomeIcon />} current={true} isActive />
        <NavLink to="transaction-requests">
          <DropDown
            title="Request"
            icon={
              <BanknotesIcon className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
            }>
            <DropDownItems classNames={classNames} flex="flex">
              
              <Link
                to="/transaction-requests"
                className={({ isActive }) => (isActive ? 'grooming-text mt-4' : 'mt-4')}>
                All Request
              </Link>
            </DropDownItems>
            <DropDownItems classNames={classNames} flex="flex">
              <Link
                to="/transaction-requests/initiated"
                className={({ isActive }) => (isActive ? 'grooming-text mt-4' : 'mt-4')}>
                Initiated Request
              </Link>
            </DropDownItems>
            <DropDownItems classNames={classNames} flex="flex">
              <Link
                to="/transaction-requests/assigned"
                className={({ isActive }) => (isActive ? 'grooming-text mt-4' : 'mt-4')}>
                Assigned Requests
              </Link>
            </DropDownItems>
          </DropDown>
        </NavLink>
        <NavLinks to="/reports" icon={<ChartPieIcon />} name="Reports" current={false} isActive />
        <NavLinks
          to="/audit"
          icon={<DocumentMagnifyingGlassIcon />}
          name="Audit trail"
          current={false}
          isActive
        />
        <NavLinks
          to="/corperate/create"
          icon={<BriefcaseIcon />}
          name="Corporate Account"
          current={false}
          isActive
        />
        <NavLinks
          to="/mandate-rule"
          icon={<RocketLaunchIcon />}
          name="Mandate Rule"
          current={false}
          isActive
        />
        <NavLinks to="/profile" icon={<UserIcon />} name="Profile" current={false} isActive />
        <NavLinks
          to="/settings"
          icon={<CogIcon />}
          name="Account Settings"
          current={false}
          isActive
        />
        <NavLinks
          to="/"
          icon={<ArrowLeftOnRectangleIcon />}
          name="Logout"
          current={false}
          isActive
        />
      </nav>
    </div>
  );
};
