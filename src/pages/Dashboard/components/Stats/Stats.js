import { BanknotesIcon, BriefcaseIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { Container } from 'components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { analyticsService } from 'services';
import { useQuery } from '@tanstack/react-query';

const cardDetails = [
  {
    label: 'Number of corporate account',
    value: '0  Account',
    icon: BriefcaseIcon,
    route: '/accounts'
  },
  {
    label: 'Number of users',
    value: '0 User',
    icon: UserCircleIcon,
    route: '/user-management'
  },
  {
    label: 'Number of transfers',
    value: `0 Transfer`,
    icon: BanknotesIcon,
    route: '/transfers/transfer-made'
  }
];
export const Cards = () => {
  const navigate = useNavigate();
  useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: () => analyticsService.getDashboardAnalysis(),
    onSuccess: (data) => {
      cardDetails[0].value = `${data?.totalAccounts ?? 0} Account`;
      cardDetails[1].value = `${data?.totalUsers ?? 0} User(s)`;
      cardDetails[2].value = `${data?.totalTransfers ?? 0} Transfer`;
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
              <h4 className="text-2xl font-bold tracking-tight text-gray-900">{item.value}</h4>
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};
