import { transactionService } from 'services';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useInitiateRequest = () => {
  const navigate = useNavigate();

  const { data: bankList } = useQuery({
    queryKey: ['bank-lists'],
    queryFn: transactionService.getBankList
  });

  const initiateRequest = useMutation((data) => transactionService.initiateTransaction(data), {
    onSuccess: () => {
      navigate('/transaction-requests');
    }
  });

  return { bankList, initiateRequest };
};
