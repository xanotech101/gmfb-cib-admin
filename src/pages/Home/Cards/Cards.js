/* eslint-disable no-unused-vars */
import { BanknotesIcon, BriefcaseIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { accountService, userService, transactionService } from 'services';
import { useQuery } from '@tanstack/react-query';

const cardDetails = [
  {
    label: 'Number of corporate account',
    value: '0 Corporate Account',
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
    route: '/transfers/transfer-made'
  }
];
export const Cards = () => {
  const id = useParams();
  const { data: corporate } = useQuery({
    queryKey: ['accounts'],
    queryFn: accountService.getAllAccounts
  });
  const CorporateUsers = corporate?.length;
  const { data: users } = useQuery({
    queryKey: ['getMyBranchUsers', id],
    queryFn: () =>
      userService.getBranchUsers({
        branchId: id
      }),
    enabled: !!id
  });
  const { data } = useQuery({
    queryKey: ['approved-transfers'],
    queryFn: () => transactionService.getAllInitiatedRequests
  });
  console.log(data);
  const navigate = useNavigate();

  const CardDetails = [
    {
      label: 'Number of corporate account',
      value: `${CorporateUsers ?? 0.0}  Account`,
      icon: BriefcaseIcon,
      action: () => {
        navigate('/accounts');
      }
    },
    {
      label: 'Number of users',
      value: `${users?.length ?? 0.0} User`,
      icon: UserCircleIcon,
      action: () => {
        navigate('/user-management');
      }
    },
    {
      label: 'Number of transfers',
      value: `${data?.length} Transfers`,
      icon: BanknotesIcon,
      action: () => {
        navigate('/transfers/transfer-made');
      }
    }
  ];

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
              <he className="text-2xl font-bold tracking-tight text-gray-900">{item.value}</he>
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};
