import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { SubHeading } from 'components/Common/Header/SubHeading';
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
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (data) => userService.createCorporateUser(data),
    onSuccess: () => {
      navigate('/settings/users');
    }
  });

  const { data } = useQuery({
    queryKey: ['privileges'],
    queryFn: () => privilegeService.getPrivileges()
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      privileges: [].concat(data.privileges.value),
      imageUrl: 'google.com/fsdfdsfdd',
      gender: data.gender.value
    };
    mutate(payload);
  };

  return (
    <div className="w-full lg:w-[100%]">
      <Container>
        <div className="mb-8 pb-2 border-b">
          <SubHeading>Add user</SubHeading>
          <p className="text-md mt-2">Fill in user details below</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid md:flex sm:flex flex flex-col grid-cols-2  gap-6">
            <Input
              label="First name"
              id="firstName"
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
          <div className="lg:grid md:flex sm:flex flex flex-col grid-cols-2 gap-6">
            <Input
              label="Email"
              id="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              error={errors.email && 'Email is required'}
            />
            <Input
              label="Phone Number"
              id="phone"
              {...register('phone', { required: true })}
              error={errors.phone && 'Phone number is required'}
            />
          </div>
          <div className="lg:grid md:flex sm:flex flex flex-col grid-cols-2 gap-6">
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
              options={(data?.privileges ?? []).map((privilege) => ({
                label: privilege.name,
                value: privilege._id
              }))}
              error={errors.privileges && 'Privileges are required'}
            />
          </div>
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
