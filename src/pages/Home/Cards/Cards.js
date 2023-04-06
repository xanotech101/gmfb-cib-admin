import { BanknotesIcon, BriefcaseIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import { useNavigate } from 'react-router-dom';
import { accountService } from 'services';
import { useQuery } from '@tanstack/react-query';
export const Cards = () => {
  const { data } = useQuery({
    queryKey: ['accounts'],
    queryFn: accountService.getAllAccounts
  });
  const CorporateUsers = data?.length;
  const navigate = useNavigate();
  const CardDetails = [
    {
      label: 'Number of corporate account',
      value: `${CorporateUsers ?? 0.0} Corporate Account`,
      icon: BriefcaseIcon,
      action: () => {
        navigate('/accounts');
      }
    },
    {
      label: 'Number of users',
      value: `${0.0} Users`,
      icon: UserCircleIcon,
      action: () => {
        navigate('/user-management');
      }
    },
    {
      label: 'Number of transfers',
      value: `${0.0} Transfers`,
      icon: BanknotesIcon,
      action: () => {
        navigate('/transfers/transfer-made');
      }
    }
  ];

  return (
    <div className="lg:grid grid-cols-3 flex flex-col gap-5 mb-5">
      {CardDetails.map((item) => (
        <Container key={item.id}>
          <div className="relative overflow-hidden cursor-pointer" onClick={item.action}>
            <div>
              <div className="absolute rounded-md grooming-color p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.label}</p>
            </div>
            <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <Heading>{item.value}</Heading>
            </div>
          </div>
        </Container>
      ))}
    </div>
  );
};
