/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Form/Input/Input';
import { useQuery, useMutation } from '@tanstack/react-query';
import { accountService } from 'services';
import { useDebounce } from 'hooks/useDebounce';
import { useForm } from 'react-hook-form';
import { Select } from 'components/Form/Select/Select';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

const formStateOptions = {
  accountVerification: 'account-verification',
  adminDetails: 'admin-details'
};

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const debouncedValue = useDebounce(accountNumber, 800);
  const [formState, setFormState] = useState(formStateOptions.accountVerification);
  const [accountLookupError, setAccountLookError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm();
  const organizationLabelValue = watch('organizationLabel')?.value;

  const { isFetching } = useQuery({
    queryFn: () => {
      setAccountInfo(null);
      setAccountLookError(null);
      return accountService.getAccountInfo(debouncedValue);
    },
    queryKey: ['account-Info', debouncedValue],
    onSuccess: (data) => {
      if (data.status === 'Success') {
        const fallbackName = `${data.data.LastName} ${data.data.OtherNames}`;
        setAccountInfo({
          name: data.data.Name ?? fallbackName,
          email: data.data.Email,
          customerId: data.data.customerID,
          accountNumber: [debouncedValue]
        });
        setValue('account_email', data.data.Email);
      }
    },
    onError: (error) => {
      setAccountLookError(error.message);
    },
    enabled: debouncedValue.length > 0
  });

  const { data: accountLabels } = useQuery({
    queryFn: () => accountService.getAccountLabels(),
    queryKey: ['account-labels']
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => accountService.onBoardCorporateAccount(data),
    onSuccess: () => {
      navigate('/accounts');
    }
  });

  const onSubmit = (data) => {
    const payload = {
      accountDetails: {
        accountNumber: accountInfo.accountNumber,
        accountName: accountInfo.name,
        customerID: accountInfo.customerId,
        email: data.account_email,
        organizationLabel: data.organizationLabel.value
      },
      admin: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        gender: data.gender.value,
        imageUrl: 'google.com/fsdfdsfdd'
      }
    };
    mutate(payload);
  };

  return (
    <>
      <form
        className={classnames('space-y-6', {
          hidden: formState === formStateOptions.adminDetails
        })}>
        <p className="font-bold text-lg">Account Info</p>
        <Input
          label="Account Number"
          id="account_number"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setAccountInfo(null);
            }
            setAccountNumber(e.target.value);
          }}
        />
        {isFetching && <p className="text-sm text-gray-500">Fetching account details...</p>}
        {accountLookupError && (
          <div className="border-l-4 border-red-400 bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{accountLookupError}</p>
              </div>
            </div>
          </div>
        )}

        {accountInfo && (
          <>
            <Input label="Name" id="account_name" disabled defaultValue={accountInfo.name} />
            <Input
              label="Email Address"
              id="account_email"
              {...register('account_email', { required: true })}
              defaultValue={accountInfo.email}
            />
            <Select
              label="Select Organization Label"
              name="organizationLabel"
              control={control}
              options={(accountLabels ?? []).map(({ _id, label }) => ({
                label,
                value: _id
              }))}
              error={errors.organizationLabel && 'Organization Label is required'}
            />
            <hr />
            <p className="font-bold text-lg">Accounts</p>

            {accountInfo.accountNumber?.map((item, index) => (
              <div key={index} className="space-y-6">
                <Input defaultValue={item} disabled />
              </div>
            ))}
            <Button
              isFullWidth
              onClick={() => setFormState(formStateOptions.adminDetails)}
              disabled={!organizationLabelValue}>
              Next
            </Button>
          </>
        )}
      </form>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classnames('space-y-6', {
          hidden: formState === formStateOptions.accountVerification
        })}>
        <p className="font-bold text-lg">Admin Info</p>
        <Input
          label="First name"
          id="max_amount"
          {...register('firstName', { required: true })}
          error={errors.firstName && 'First name is required'}
        />

        <Input
          label="Last name"
          id="lastName"
          {...register('lastName', { required: true })}
          error={errors.lastName && 'Last name is required'}
        />

        <Input
          label="Phone number"
          id="phone_number"
          placeholder="phone number must begin with 0 eg:(070)"
          {...register('phone', { required: true, maxLength: 11, minLength: 11 })}
          error={errors.phone && 'Phone number is required and must be 11 digit'}
        />

        <Input
          label="Email"
          id="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          error={errors.email && 'Email is required'}
        />
        <Select
          label="Gender"
          name="gender"
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
          error={errors.gender && 'Gender are required'}
        />

        <div className="flex items-center justify-between pt-8">
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => setFormState(formStateOptions.accountVerification)}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
