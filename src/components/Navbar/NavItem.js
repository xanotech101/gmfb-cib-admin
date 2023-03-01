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
import { NavLink } from './NavLink';
import { DropDown } from 'components/DropDown/DropDown';
import { DropDownItems } from 'components/DropDown/DropDownItems';
import { Link } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const NavItem = () => {
  return (
    <div>
      <nav className="flex-1 space-y-1 px-2 pb-4">
        <NavLink to="/dashboard" name="Dashboard" icon={<HomeIcon />} current={true} />
        <DropDown
          title="Request"
          text="text-white grooming-color2"
          icon={
            <BanknotesIcon className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
          }>
          <DropDownItems classNames={classNames} flex="flex">
            <BanknotesIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
            <Link to="/transaction-requests/initiated">Initiated Request</Link>
          </DropDownItems>
          <DropDownItems classNames={classNames} flex="flex">
            <BanknotesIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
            <Link to="/transaction-requests/assigned">Assigned Requests</Link>
          </DropDownItems>
        </DropDown>
        <NavLink to="/reports" icon={<ChartPieIcon />} name="Reports" current={false} />
        <NavLink
          to="/audit"
          icon={<DocumentMagnifyingGlassIcon />}
          name="Audit trail"
          current={false}
        />
        <NavLink
          to="/corperate"
          icon={<BriefcaseIcon />}
          name="Corporate Account"
          current={false}
        />
        <NavLink
          to="/mandate-rule"
          icon={<RocketLaunchIcon />}
          name="Mandate Rule"
          current={false}
        />
        <NavLink to="/profile" icon={<UserIcon />} name="Profile" current={false} />
        <NavLink to="/settings" icon={<CogIcon />} name="Account Settings" current={false} />
        <NavLink to="/" icon={<ArrowLeftOnRectangleIcon />} name="Logout" current={false} />
      </nav>
    </div>
  );
};
