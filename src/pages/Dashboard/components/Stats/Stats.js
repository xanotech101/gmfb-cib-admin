import { BanknotesIcon, BriefcaseIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { Container } from 'components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { analyticsService } from 'services';
import { useQuery } from '@tanstack/react-query';
import { isGcAdmin } from 'utils/getUserRole';

const cardDetails = [
  {
    label: 'Number of corporate account',
    value: '0  Accounts',
    icon: BriefcaseIcon,
    route: '/accounts'
  },
  {
    label: 'Number of users',
    value: '0 Users',
    icon: UserCircleIcon,
    route: '/user-management'
  },
  {
    label: 'Number of transfers',
    value: `0 Transfers`,
    icon: BanknotesIcon,
    route: '/transfer-requests'
  }
];
export const Cards = () => {
  const navigate = useNavigate();
  const { isFetching } = useQuery({
    queryKey: ['dashboard-analytics', isGcAdmin()],
    queryFn: () => analyticsService.getDashboardAnalysis(),
    onSuccess: (data) => {
      cardDetails[0].value = `${data?.totalAccounts ?? 0}`;
      cardDetails[1].value = `${data?.totalUsers ?? 0}`;
      cardDetails[2].value = `${data?.totalTransfers ?? 0}`;
    }
  });
  return (
    <div className="lg:grid grid-cols-3 flex flex-col gap-5 mb-5">
      {cardDetails.map((item) => (
        <Container key={item.label}>
          <div
            className="relative overflow-hidden cursor-pointer"
            onClick={() => {
              navigate(item.route);
            }}>
            <div>
              <div className="absolute rounded-md grooming-color p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.label}</p>
            </div>
            <div className="ml-16 flex items-baseline">
              <h4 className="text-2xl font-bold tracking-tight text-gray-900">
                {isFetching ? '...' : item.value}
              </h4>
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};
