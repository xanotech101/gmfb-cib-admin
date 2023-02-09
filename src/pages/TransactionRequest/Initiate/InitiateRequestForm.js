import { Input } from 'components/Form/Input/Input';
import { Select } from 'components/Form/Select/Select';
import { Button } from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { transactionService } from 'services';
import { useNavigate } from 'react-router-dom';

export const InitiateRequestForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const accountNumber = watch('account_number');
  const bankCode = watch('bank');

  const { data } = useQuery({
    queryKey: ['bank-lists'],
    queryFn: transactionService.getBankList
  });

  const enableResolveBankAccountQuery = accountNumber?.length === 10 && !!bankCode;

  const {
    data: accountInfo,
    isLoading,
    status
  } = useQuery({
    queryKey: ['resolve-account', accountNumber, bankCode],
    queryFn: () =>
      transactionService.resolveBankAccount({
        bank_code: bankCode?.value,
        account_number: accountNumber
      }),
    enabled: enableResolveBankAccountQuery,
    onSuccess: (data) => {
      setValue('account_name', data.account_name);
    },
    onError: () => {
      setValue('account_name', '');
    }
  });
  const isValidatingBankDetails = isLoading && enableResolveBankAccountQuery;

  const { mutate: initiateRequest, isLoading: isInitiatingRequest } = useMutation(
    (data) => transactionService.initiateTransaction(data),
    {
      onSuccess: () => {
        reset();
        navigate('/transaction-requests');
      }
    }
  );

  const onSubmit = (data) => {
    const payload = {
      customerName: data.customer_name,
      amount: Number(data.amount),
      bankName: data.bank.label,
      accountNumber: data.account_number,
      accountName: data.account_name
    };
    initiateRequest(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* customer information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
        <Input
          label="Customers name"
          id="customer_name"
          {...register('customer_name', { required: true })}
          error={errors.customer_name && 'Customer name is required'}
        />
        <Input
          label="Amount"
          id="amount"
          {...register('amount', { required: true })}
          error={errors.amount && 'Amount is required'}
        />
      </div>

      {/* bank information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mt-7">Bank information</h3>
        <Select
          label="Bank Name"
          name="bank"
          control={control}
          options={data?.map((bank) => ({ value: bank.code, label: bank.name })) || []}
          error={errors.bank && 'Bank name is required'}
        />
        <Input
          label="Account Number"
          id="account_number"
          {...register('account_number', { required: true, min: 10 })}
          error={errors.account_number && 'Account number is required'}
        />

        <div className="hidden">
          <Input
            label="Account Name"
            id="account_name"
            {...register('account_name', { required: true, min: 10 })}
            error={errors.account_name && 'Account name is required'}
          />
        </div>

        {status === 'success' && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Account Name:</span>
            <span className="text-sm text-gray-900">{accountInfo?.account_name}</span>
          </div>
        )}
        {status === 'error' && (
          <span className="text-sm text-gray-r00">Unable to resolve account</span>
        )}
      </div>

      <div className="pt-8">
        <Button type="submit" disabled={isValidatingBankDetails || isInitiatingRequest} isFullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
};
