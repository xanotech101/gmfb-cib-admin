import { useForm } from 'react-hook-form';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { useMutation } from '@tanstack/react-query';
import { authService } from 'services';
import { Container } from 'components/Container/Container';
import { SubHeading } from 'components/Header/SubHeading';
import UpdateSecurityQuestion from './UpdateSecurityQuestion';
import { Heading } from 'components/Header/Heading';

export const Security = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
  } = useForm();

  const { mutate, isLoading } = useMutation((data) => authService.changePassword(data), {
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="p-5">
      <div className="mb-6">
        <Heading>Security</Heading>
        <p className="mb-3 mt-2">Kindly make your changes below.</p>
      </div>
      <Container>
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <SubHeading>Change password</SubHeading>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Update your password associated with your account.
            </p>
          </div>
          <form
            className="space-y-6 col-span-12 md:col-span-8 lg:col-span-4 mt-4"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Old Password"
              type="password"
              id="old_password"
              {...register('old_password', { required: true })}
              error={errors.password && 'Password is required'}
            />
            <Input
              label="New Password"
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
            <div className="pt-2">
              <Button type="submit" disabled={isLoading}>
                Change Password
              </Button>
            </div>
          </form>
        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <SubHeading>Update your security Questions</SubHeading>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Please be careful while choosing your security questions.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-4">
            <UpdateSecurityQuestion />
          </div>
        </div>
      </Container>
    </div>
  );
};
