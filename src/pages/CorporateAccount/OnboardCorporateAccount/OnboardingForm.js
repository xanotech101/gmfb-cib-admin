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

const formStateOptions = {
  accountVerification: 'account-verification',
  adminDetails: 'admin-details'
};

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const debouncedValue = useDebounce(accountNumber, 500);
  const [formState, setFormState] = useState(formStateOptions.accountVerification);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm();

  useQuery({
    queryFn: () => {
      setAccountInfo(null);
      return accountService.getCustomerInfo(debouncedValue);
    },
    queryKey: ['getAccountInfo', debouncedValue],
    onSuccess: (data) => {
      if (data.status === 'Success') {
        setAccountInfo({
          name: data.data.name,
          email: data.data.email,
          customerId: data.data.customerID,
          accountNumber: data.data.Accounts.map((account) => account.accountNumber),
          branchCode: data.data.branchCode
        });
        setValue('account_email', data.data.email);
      }
    },
    enabled: debouncedValue.length > 0
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
        email: data.account_email
      },
      admin: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phone,
        email: data.email,
        gender: data.gender.value,
        imageUrl: 'google.com/fsdfdsfdd'
      }
    };
    mutate(payload);
  };

  return (
    <>
      {console.log('accountInfo', accountInfo)}
      <form
        className={classnames('space-y-6', {
          hidden: formState === formStateOptions.adminDetails
        })}>
        <p className="font-bold text-lg">Account Info</p>
        <Input
          label="Customer ID"
          id="account_number"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setAccountInfo(null);
            }
            setAccountNumber(e.target.value);
          }}
        />

        {accountInfo && (
          <>
            <Input
              label="Name"
              id="account_name"
              readOnly
              disabled
              defaultValue={accountInfo.name}
            />
            <Input
              label="Email Address"
              id="account_email"
              {...register('account_email', { required: true })}
              defaultValue={accountInfo.email}
            />
            <hr />
            <p className="font-bold text-lg">Accounts</p>

            {accountInfo.accountNumber?.map((item, index) => (
              <div key={index} className="space-y-6">
                <Input value={item} onChange={() => {}} disabled />
                <hr />
              </div>
            ))}
            <Button isFullWidth onClick={() => setFormState(formStateOptions.adminDetails)}>
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
          {...register('phone', { required: true })}
          error={errors.phone && 'Phone number is required'}
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
