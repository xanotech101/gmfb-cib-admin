import { Badge } from 'components/Badge/Badge';
import { Button } from 'components/Button/Button';
import { Outlet, NavLink, useParams, useNavigate } from 'react-router-dom';
import { useAccountDetails } from './Overview/hooks/useAccountDetails';

const secondaryNavigation = [
  { name: 'Overview', href: 'overview', current: true },
  { name: 'Users', href: 'users', current: false },
  { name: 'Transaction History', href: 'transaction-history', current: false },
  { name: 'Audit Trails', href: 'audit-trails', current: false },
  { name: 'Transfer Request', href: 'transfer-requests', current: false },
  { name: 'Mandate', href: 'mandate', current: false }
];

export const CorporateAccount = () => {
  const { accountDetails, accountBalance } = useAccountDetails();
  const { id: accountId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="ml-2">
        <nav className="flex overflow-x-auto border-b border-gray-200 py-4 sticky top-0 z-30 backdrop-blur-[20px] h-16 items-center">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-medium leading-6 text-gray-500 sm:px-6 lg:px-8">
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={`/accounts/${accountId}/${item.href}`}
                  className={({ isActive }) => isActive && 'text-primary'}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 border-gray-200 border-b px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <Badge status="active">Active</Badge>
            <h1 className="flex gap-x-3 text-sm leading-7 text-gray-900 font-semibold">
              {accountDetails?.data?.accountName}
            </h1>
            <h2 className="text-sm font-semibold text-gray-500 mt-2.5">
              {accountDetails?.data?.accountNumber?.[0]}
            </h2>
            <h2 className="text-xl font-semibold text-gray-900">
              NGN {accountBalance?.data && accountBalance?.data?.AvailableBalance}
            </h2>
          </div>
          <Button variant="outline" onClick={() => navigate('/accounts')}>
            Back
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
