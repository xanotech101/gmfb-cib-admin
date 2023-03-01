import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';
import { userService, privilegeService } from 'services';
import { useNavigate } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';

export const CreateCorperateUser = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => userService.createCorporateUser(data),
    onSuccess: () => {
      navigate('/settings/corporate-users');
    }
  });

  const { data } = useQuery({
    queryKey: ['privileges'],
    queryFn: () => privilegeService.getPrivileges()
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      privileges: getValues('privileges').map((privilege) => privilege.value),
      organizationId: '4747fdedede',
      imageUrl: 'google.com/fsdfdsfdd',
      gender: data.gender.value
    };
    mutate(payload);
  };

  return (
    <div className="w-full lg:w-[70%]">
      <Container>
        <div className="mb-8 pb-2 border-b">
          <Heading>Create corporate User</Heading>
          <p className="font-medium">Fill in corporate details below</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
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
          </div>
          <div className="grid grid-cols-2 gap-6">
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
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Password"
              type="password"
              id="password"
              {...register('password', { required: true })}
              error={errors.password && 'Password is required'}
            />

            <Input
              label="Confirm Password"
              type="password"
              id="confirm_password"
              {...register('confirm_password', {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords should match!';
                }
              })}
              error={
                errors.confirm_password &&
                (errors.confirm_password?.message ?? 'Confirm Password is required')
              }
            />
          </div>

          <Select
            label="Privileges"
            name="privileges"
            control={control}
            options={(data?.privileges ?? []).map((privilege) => ({
              label: privilege.name,
              value: privilege._id
            }))}
            isMulti
            error={errors.privileges && 'Privileges are required'}
          />
          <div className="mt-8">
            <Button disabled={isLoading} type="submit" isFullWidth>
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
