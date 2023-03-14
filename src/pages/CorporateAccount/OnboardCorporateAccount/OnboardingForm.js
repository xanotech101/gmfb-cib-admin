import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Form/Input/Input';
import { useQuery, useMutation } from '@tanstack/react-query';
import { accountService, privilegeService } from 'services';
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
      return accountService.getAccountInfo(debouncedValue);
    },
    queryKey: ['getAccountInfo', debouncedValue],
    onSuccess: (data) => {
      if (data.IsSuccessful) {
        setAccountInfo({
          name: data.Message.Name,
          branch: data.Message.Branch,
          email: data.Message.Email,
          customerId: data.Message.CustomerId
        });
        setValue('account_email', data.Message.email);
      }
    },
    enabled: debouncedValue.length > 0
  });

  const { data: privileges } = useQuery({
    queryKey: ['privileges'],
    queryFn: () => privilegeService.getPrivileges()
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => accountService.onBoardCorporateAccount(data),
    onSuccess: () => {
      navigate('/corporate-account');
    }
  });

  const onSubmit = (data) => {
    const payload = {
      accountDetails: {
        accountNumber,
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
        imageUrl: 'google.com/fsdfdsfdd',
        privileges: data.privileges.map((privilege) => privilege.value)
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

        {accountInfo && (
          <>
            <Input
              label="Account Name"
              id="account_name"
              readOnly
              disabled
              defaultValue={accountInfo.name}
            />
            <Input
              label="Account Branch"
              id="account_branch"
              readOnly
              disabled
              defaultValue={accountInfo.branch}
            />
            <Input
              label="Account Email"
              id="account_email"
              {...register('account_email', { required: true })}
              defaultValue={accountInfo.email}
            />
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
        <Select
          label="Privileges"
          name="privileges"
          control={control}
          options={(privileges?.privileges ?? []).map((privilege) => ({
            label: privilege.name,
            value: privilege._id
          }))}
          isMulti
          error={errors.privileges && 'Privileges are required'}
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
