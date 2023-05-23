import React from 'react';
import {
  HomeIcon,
  CogIcon,
  BriefcaseIcon,
  DocumentMagnifyingGlassIcon,
  ChartPieIcon,
  ArrowLeftOnRectangleIcon,
  UserGroupIcon,
  BanknotesIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeOpenIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { NavLinks } from './NavLink';
import { useModal } from 'hooks';
import { Link, useNavigate } from 'react-router-dom';
import LogoutPrompt from 'pages/Auth/LogoutPrompt/LogoutPrompt';
import { DropDownItems } from 'components/DropDown/DropDownItems';
import { DropDown } from 'components/DropDown/DropDown';
export const NavItem = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const handleLogout = () => {
    showModal();
  };
  const isSettings = /settings/i.test(window.location.pathname);
  const isTransferRequest = /transfers/i.test(window.location.pathname);
  const isApi = /api-console/i.test(window.location.pathname);

  return (
    <div className="h-[90%] overflow-y-auto side-bar">
      <nav className="flex-1 space-y-1 px-2 pb-4">
        <NavLinks to="/dashboard" name="Dashboard" icon={<HomeIcon />} current={true} />
        <NavLinks
          to={!isTransferRequest ? 'transfers/transfer-made' : 'transfers'}
          icon={<BanknotesIcon />}
          name="Transfers"
          current={false}
          onClick={closeSidebar}
        />

        <NavLinks
          to="/audit"
          icon={<DocumentMagnifyingGlassIcon />}
          name="Audit trail"
          current={false}
          isActive
          onClick={closeSidebar}
        />

        <DropDown
          title="Onboarding"
          text="text-white  mt-5"
          icon={
            <UserGroupIcon className="mr-3 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true" />
          }>
          <DropDownItems>
            <Link to="onboard" className="block">
              Onboarding
            </Link>
          </DropDownItems>
          <DropDownItems>
            <Link to="batch" className="block">
              Batch Onboarding
            </Link>
          </DropDownItems>
        </DropDown>

        <NavLinks
          to="/requests"
          icon={<EnvelopeOpenIcon />}
          name="Tickets"
          current={false}
          onClick={closeSidebar}
        />
        <NavLinks
          to="/reports"
          icon={<ChartPieIcon />}
          name="Analytics"
          current={false}
          onClick={closeSidebar}
        />

        <NavLinks
          to="/accounts"
          icon={<BriefcaseIcon />}
          name="Accounts"
          current={false}
          isActive
          onClick={closeSidebar}
        />

        <NavLinks
          to={!isApi ? '/api-console/api-usage' : 'api-console'}
          icon={<ArrowTopRightOnSquareIcon />}
          name="Api Console"
          current={false}
          isActive
          onClick={closeSidebar}
        />
        <NavLinks
          to={'user-management'}
          icon={<UserCircleIcon />}
          name="User Management"
          current={false}
          isActive
          onClick={closeSidebar}
        />
        <NavLinks
          to={!isSettings ? 'settings/general' : 'settings'}
          icon={<CogIcon />}
          name="Settings"
          current={false}
          isActive
          onClick={closeSidebar}
        />
        <p
          className="group flex items-center px-2 py-5 text-sm font-medium rounded-md text-white mt-5 relative cursor-pointer"
          onClick={() => {
            handleLogout();
            closeSidebar();
          }}>
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
