import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'components/Form/Input/Input';
import { authService } from 'services';
import { Button } from 'components/Button/Button';
import { Link } from 'react-router-dom';

export const ForgotPasswordForm = ({ callback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation((data) => authService.forgotPassword(data), {
    onSuccess: ({ message }) => {
      callback(message, false);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message ?? 'email not registered on this platform';
      callback(errorMessage, true);
    }
  });

  const onSubmit = (data) => mutate(data.email);

  return (
    <>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          error={errors.email && 'Email is required'}
        />
        <Link to={'/'} className="flex justify-end text-[#891c69] font-medium text-sm">
          Back to login
        </Link>
        <div className="pt-5">
          <Button disabled={isLoading} isFullWidth type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
