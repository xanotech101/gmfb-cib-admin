import { SubHeading } from 'components/Common/Header/SubHeading';
import { KeyIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { useMutation } from '@tanstack/react-query';
import { authService } from 'services';
import { Container } from 'components/Container/Container';

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
    <div className=''>
      <Container>
      <SubHeading>Security Settings</SubHeading>
      <p className="flex items-center my-6 gap-2 text-md">
        Update Password
        <KeyIcon width="20px" />
      </p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="pt-6">
          <Button type="submit" disabled={isLoading} isFullWidth>
            Change Password
          </Button>
        </div>
      </form>
      </Container>
    </div>
  );
};
