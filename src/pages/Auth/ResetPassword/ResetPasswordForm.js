import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Form/Input/Input';
import { authService } from 'services';

export const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation((data) => authService.resetPassword(data), {
    onSuccess: () => navigate('/')
  });

  const onSubmit = (data) => mutate({ ...data, token });

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="password"
        label="Password"
        id="password"
        {...register('password', { required: true })}
        error={errors.password && 'Password is required'}
      />
      <Input
        type="password"
        label="Confirm Password"
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
      <div className="pt-5">
        <Button disabled={isLoading} type="submit" isFullWidth>
          Create New Password
        </Button>
      </div>
    </form>
  );
};
