import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { useQuery } from '@tanstack/react-query';
import { accountService } from 'services';
import { useStore } from 'hooks';

export const UserManagement = () => {
  const { user } = useStore();

  const { data } = useQuery({
    queryFn: () => accountService.getAccountInfo(user.organizationId.accountNumber),
    queryKey: ['account-info'],
    enabled: !!user
  });

  return (
    <div className=" px-7 py-6 lg:w-[80%] w-full">
      <Container>
        <div className="p-3">
          <div className="flex md:flex-col sm:flex-col lg:flex-row flex-col justify-between gap-2">
            <div>
              <Heading>User Information</Heading>
            </div>
          </div>
          <div className="mt-5 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 flex  text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  {user?.organizationId?.accountName}
                </dd>
              </div>
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  <span className="flex-grow">{user?.organizationId?.accountNumber}</span>
                </dd>
              </div>
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  <span className="flex-grow">{data?.Message?.Email}</span>
                </dd>
              </div>
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Branch</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  <span className="flex-grow">{data?.Message?.Branch}</span>
                </dd>
              </div>
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  <span className="flex-grow">{data?.Message?.PhoneNumber}</span>
                </dd>
              </div>
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">NUBAN</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  <span className="flex-grow">{data?.Message?.NUBAN}</span>
                </dd>
              </div>
              <div className="py-5 flex  sm:flex-col md:flex-row flex-col lg:flex-row justify-between sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Notification Preference</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-medium">
                  <span className="flex-grow">{data?.Message?.NotificationPreference}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </div>
  );
};
