import React from 'react';
import {
  HomeIcon,
  CogIcon,
  BriefcaseIcon,
  // DocumentMagnifyingGlassIcon,
  ChartPieIcon,
  ArrowLeftOnRectangleIcon,
  // RocketLaunchIcon,
  UserIcon,
  BanknotesIcon,
  // ClockIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';
import { NavLinks } from './NavLink';
import { DropDown } from 'components/DropDown/DropDown';
import { DropDownItems } from 'components/DropDown/DropDownItems';
import { Link } from 'react-router-dom';

export const NavItem = () => {
  return (
    <div className="h-[90%] overflow-y-auto side-bar">
      <nav className="flex-1 space-y-1 px-2 pb-4">
        <NavLinks to="/dashboard" name="Dashboard" icon={<HomeIcon />} current={true} />
        <DropDown
          title="Transfer Request"
          text="text-white  mt-5"
          icon={
            <BanknotesIcon className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
          }>
          <DropDownItems flex="flex">
            <Link className="w-full h-full" to="/transaction-requests/all">
              All Request
            </Link>
          </DropDownItems>
          <DropDownItems flex="flex">
            <Link to="/transaction-requests/initiated" className="w-full h-full">
              Initiated Requests
            </Link>
          </DropDownItems>
          <DropDownItems flex="flex">
            <Link to="/transaction-requests/assigned" className="w-full h-full">
              Assigned Requests
            </Link>
          </DropDownItems>
        </DropDown>
        <NavLinks to="/reports" icon={<ChartPieIcon />} name="Reports" current={false} />
        {/* <NavLinks
          to="/audit"
          icon={<DocumentMagnifyingGlassIcon />}
          name="Audit trail"
          current={false}
          isActive
        /> */}
        <NavLinks
          to="/requests"
          icon={<HandThumbUpIcon />}
          name="Ticketing Request"
          current={false}
        />
        {/* <NavLinks
          to="/transaction-history"
          icon={<ClockIcon />}
          name="Transaction History"
          current={false}
        /> */}

        <NavLinks
          to="/corporate-account"
          icon={<BriefcaseIcon />}
          name="Corporate Account"
          current={false}
          isActive
        />
        {/* <NavLinks
          to="mandate-rule"
          icon={<RocketLaunchIcon />}
          name="Mandate Rule"
          current={false}
          isActive
        /> */}
        <NavLinks to="profile" icon={<UserIcon />} name="Profile" current={false} isActive />
        <NavLinks
          to="settings"
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
