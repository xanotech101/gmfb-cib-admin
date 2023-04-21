import { Input } from 'components/Form/Input/Input';
import { Select } from 'components/Form/Select/Select';
import { Button } from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { accountService } from 'services';
import { useInitiateRequest } from '../hooks/useInitiateRequest';

export const InitiateRequestForm = () => {
  const { bankList, initiateRequest } = useInitiateRequest();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();
  const accountNumber = watch('beneficiaryAccountNumber');
  const bankCode = watch('beneficiaryBank');
  const accountName = getValues('beneficiaryAccountName');

  const enableResolveBankAccountQuery = accountNumber?.length === 10 && !!bankCode;

  const nameEnquiry = useQuery({
    queryKey: ['name-enquiry', accountNumber, bankCode],
    queryFn: () =>
      accountService.getNameEnquiry({
        bankCode: bankCode?.value,
        accountNumber: accountNumber
      }),
    enabled: !!enableResolveBankAccountQuery,
    onSuccess: (data) => {
      setValue('beneficiaryAccountName', data.Name);
      setValue('beneficiaryKYC', data.KYC);
      setValue('beneficiaryBVN', data.BVN);
      setValue('NIPSessionID', data.SessionID);
    },
    onError: () => {
      setValue('beneficiaryAccountName', '');
      setValue('beneficiaryKYC', '');
      setValue('beneficiaryBVN', '');
      setValue('NIPSessionID', '');
    }
  });

  const isValidatingBankDetails = nameEnquiry.isLoading && enableResolveBankAccountQuery;

  const onSubmit = (data) => {
    const payload = {
      ...data,
      beneficiaryAccountType: data.beneficiaryAccountType.value,
      amount: Number(data.amount),
      beneficiaryBankName: data.beneficiaryBank.label,
      beneficiaryBankCode: data.beneficiaryBank.value
    };
    delete payload.beneficiaryBank;
    initiateRequest.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* customer information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
        {/* <Input
          label="Customers name"
          id="customer_name"
          {...register('customerName', { required: true })}
          error={errors.customerName && 'Customer name is required'}
        /> */}
        <Input
          label="First name"
          id="First_name"
          {...register('firstName', { required: true })}
          error={errors.firstName && 'first name is required'}
        />
        <Input
          label="Last name"
          id="last_name"
          {...register('lastName', { required: true })}
          error={errors.lastName && 'last name is required'}
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
          label="Select Bank"
          name="select bank"
          control={control}
          options={[
            {
              value: 'gmfb',
              label: 'GMFB'
            },
            {
              value: 'other bank',
              label: 'Other bank'
            }
          ]}
          error={errors.beneficiaryAccountType && 'Bank is required'}
        />
        <Input
          label="Beneficiary Phone Number"
          id="phone_number"
          {...register('beneficiaryPhoneNumber', { required: true, min: 10 })}
          error={errors.beneficiaryPhoneNumber && 'Account name is required'}
        />

        <Select
          label="Beneficiary Account Type"
          name="beneficiaryAccountType"
          control={control}
          options={[
            {
              value: 'savings',
              label: 'Savings'
            },
            {
              value: 'current',
              label: 'Current'
            }
          ]}
          error={errors.beneficiaryAccountType && 'Account type is required'}
        />

        <Select
          label="Beneficiary Bank Name"
          name="beneficiaryBank"
          control={control}
          options={bankList?.map((bank) => ({ value: bank.code, label: bank.name })) || []}
          error={errors.beneficiaryBank && 'Bank name is required'}
        />

        <Input
          label="Beneficiary Account Number"
          id="account_number"
          {...register('beneficiaryAccountNumber', { required: true, min: 10 })}
          error={errors.beneficiaryAccountNumber && 'Account number is required'}
        />

        <div className="hidden">
          <Input
            label="Beneficiary Account Name"
            id="account_name"
            {...register('beneficiaryAccountName', { required: true })}
            error={errors.beneficiaryBank && 'Account name is required'}
          />
          <Input
            label="Beneficiary KYC"
            id="kyc"
            {...register('beneficiaryKYC', { required: false, min: 10 })}
            error={errors.beneficiaryKYC && 'KYC is required'}
          />
          <Input
            label="Beneficiary BVN"
            id="bvn"
            {...register('beneficiaryBVN', { required: false, min: 10 })}
            error={errors.beneficiaryBVN && 'BVN is required'}
          />
          <Input
            label="NIPSessionID"
            id="sessionID"
            {...register('NIPSessionID', { required: false })}
            error={errors.NIPSessionID && 'Session ID is required'}
          />
        </div>

        {nameEnquiry.isSuccess && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Account Name:</span>
            <span className="text-sm text-gray-900">{accountName ?? ''}</span>
          </div>
        )}
        {nameEnquiry.isError && (
          <span className="text-sm text-gray-r00">Unable to resolve account</span>
        )}
      </div>

      <div className="pt-8">
        <Button
          type="submit"
          disabled={isValidatingBankDetails || initiateRequest.isLoading}
          isFullWidth
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
