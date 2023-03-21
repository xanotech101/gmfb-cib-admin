import React from 'react';
import {
  HomeIcon,
  CogIcon,
  BriefcaseIcon,
  // DocumentMagnifyingGlassIcon,
  ChartPieIcon,
  ArrowLeftOnRectangleIcon,
  UserGroupIcon,
  // RocketLaunchIcon,
  UserIcon,
  BanknotesIcon,
  // ClockIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';
import { NavLinks } from './NavLink';
import { useModal } from 'hooks';
// // import { DropDown } from 'components/DropDown/DropDown';
// import { DropDownItems } from 'components/DropDown/DropDownItems';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogoutPrompt from 'pages/Auth/LogoutPrompt/LogoutPrompt';
export const NavItem = () => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const handleLogout = () => {
    showModal();
  };
  return (
    <div className="h-[90%] overflow-y-auto side-bar">
      <nav className="flex-1 space-y-1 px-2 pb-4">
        <NavLinks to="/dashboard" name="Dashboard" icon={<HomeIcon />} current={true} />
        {/* <DropDown
          title="Transfer Request"
          text="text-white  mt-5"
          icon={
            <BanknotesIcon className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
          }>
          <DropDownItems flex="flex">
            <Link className='w-full h-full' to="/transaction-requests/all">All Request</Link>
          </DropDownItems>
          <DropDownItems flex="flex">
            <Link to="/transaction-requests/initiated" className='w-full h-full'>Initiated Requests</Link>
          </DropDownItems>
          <DropDownItems flex="flex">
            <Link to="/transaction-requests/assigned" className='w-full h-full'>Assigned Requests</Link>
          </DropDownItems>
        </DropDown> */}
        <NavLinks to="/transfers" icon={<BanknotesIcon />} name="Transfers" current={false} />
        <NavLinks to="/onboard" icon={<UserGroupIcon />} name="Onboarding" current={false} />
        <NavLinks
          to="/user-management"
          icon={<UserIcon />}
          name="User Management"
          current={false}
        />
        {/* <NavLinks
          to="/audit"
          icon={<DocumentMagnifyingGlassIcon />}
          name="Audit trail"
          current={false}
          isActive
        /> */}
        <NavLinks to="/requests" icon={<HandThumbUpIcon />} name="Tickets" current={false} />
        <NavLinks to="/reports" icon={<ChartPieIcon />} name="Analytics" current={false} />

        <NavLinks
          to="/accounts"
          icon={<BriefcaseIcon />}
          name="Accounts"
          current={false}
          isActive
        />
        <NavLinks to="settings" icon={<CogIcon />} name="Settings" current={false} isActive />
        <p
          className="group flex items-center px-2 py-5 text-sm font-medium rounded-md text-white mt-5 relative cursor-pointer"
          onClick={() => handleLogout()}>
          <ArrowLeftOnRectangleIcon
            className="mr-3 h-6 w-6 flex-shrink-0 text-white"
            aria-hidden="true"
          />
          Logout
        </p>
      </nav>
      {Modal({
        children: <LogoutPrompt navigate={() => navigate('/')} closeModal={showModal} />,
        size: 'sm'
      })}
    </div>
  );
};
