import { Badge } from 'components/Badge/Badge';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Outlet, NavLink, useParams, Link } from 'react-router-dom';
import { useAccountDetails } from './hooks/useAccountDetails';
import { Avatar } from 'components/Avatar/Avatar';

const secondaryNavigation = [
  { name: 'Overview', href: 'overview', current: true },
  { name: 'Users', href: 'users', current: false },
  { name: 'Transaction History', href: 'transaction-history', current: false },
  { name: 'Audit Trails', href: 'audit-trails', current: false },
  { name: 'Transfer Request', href: 'transfer-requests', current: false },
  { name: 'Mandate Rules', href: 'mandate-rule', current: false }
];

export const CorporateAccount = () => {
  const { accountDetails, accountBalance } = useAccountDetails();
  const { id: accountId } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <div className="ml-2">
        <nav className="flex overflow-x-auto border-b border-t border-gray-200 py-4 fixed top-16 mb-16 w-full z-30 backdrop-blur h-16 items-center">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-medium leading-6 text-gray-500 sm:px-6 lg:px-8">
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={`/accounts/${accountId}/${item.href}`}
                  className={({ isActive }) => (isActive ? 'text-primary font-semibold' : '')}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-gray-200 border-b px-8 pb-4 pt-20 space-y-6">
          <div className="flex items-center justify-between">
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div className="text-gray-400 hover:text-gray-500">
                    <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Home</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <Link
                      to="/accounts"
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Accounts
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="text-gray-400 hover:text-gray-500 ml-4 text-sm">
                      {accountDetails?.data?.accountName}
                    </div>
                  </div>
                </li>
              </ol>
            </nav>
            <Badge status="active">Active</Badge>
          </div>
          <div className="mt-6 grid grid-cols-8 gap-6">
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500 mt-1">Withdrawable Balance</p>
              <h2 className="text-xl font-semibold text-gray-900">
                NGN {accountBalance?.data && accountBalance?.data?.WithdrawableBalance}
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-500 mt-1">Account number</p>
              <h2 className="text-sm font-semibold text-gray-900">
                {accountDetails?.data?.accountNumber?.[0]}
              </h2>
            </div>
            {accountDetails?.data?.adminID?.firstName && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500 mt-1">Admin</p>
                <div className="flex items-center">
                  <div className="pr-3 text-sm">
                    <div className="text-gray-900 font-semibold capitalize break-words">
                      {accountDetails?.data?.adminID?.firstName}{' '}
                      {accountDetails?.data?.adminID?.lastName}
                    </div>
                    {accountDetails?.data?.adminID?.email}
                  </div>
                  <Avatar
                    name={`${accountDetails?.data?.adminID?.firstName} ${accountDetails?.data?.adminID?.lastName}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
