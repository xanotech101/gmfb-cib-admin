import { accountService } from 'services';
import { useStore } from './useStore';
import { useQuery } from '@tanstack/react-query';

export const useCustomerInfo = () => {
  const { user } = useStore();
  const { data: customerInfo } = useQuery({
    queryKey: ['customer-info'],
    queryFn: () => accountService.getCustomerInfo(user?.organizationId.customerID),
    enabled: !!user?.organizationId?.customerID
  });

  return customerInfo;
};
