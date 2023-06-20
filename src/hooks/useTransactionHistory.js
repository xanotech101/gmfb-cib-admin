import { useMutation, useQuery } from '@tanstack/react-query';
import { accountService } from 'services';
import { notification } from 'utils';

export const useTransactionHistory = (historyParams = {}, page, accountNumber) => {
  const { mutate: downloadAccountStatement, isLoading: downloading } = useMutation({
    mutationKey: ['downloadStatement'],
    mutationFn: (payload) =>
      accountService.getAccountStatement(accountNumber, {
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        isPdf: true
      }),
    onSuccess: (data, payload) => {
      const base64 = data.Message;
      const binary = atob(base64);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `account-statement-${new Date(payload.fromDate).toDateString()}-${new Date(
        payload.toDate
      ).toDateString()}-${accountNumber}.pdf`;
      link.click();
      notification('Account Statement Downloaded Successfully');
      payload.showModal();
    }
  });

  const transactions = useQuery({
    queryKey: ['transaction-history', accountNumber, page],
    queryFn: () => accountService.getTransactionHistory(accountNumber, historyParams),
    enabled: !!accountNumber
  });

  return {
    accountStatement: {
      download: downloadAccountStatement,
      downloading
    },
    transactions
  };
};
