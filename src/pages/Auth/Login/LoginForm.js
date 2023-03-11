import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Form/Input/Input';
import { authService } from 'services';

export const LoginForm = ({ successCb, errorCb }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation((data) => authService.preLogin(data), {
    onSuccess: (res, payload) => {
      successCb({ email: payload.email, questions: res.secretQuestion });
    },
    onError: (err, payload) => {
      console.log(
        '🚀 ~ file: LoginForm.js:28 ~ const{mutate,isLoading}=useMutation ~ payload:',
        err
      );
      if (err?.message === 'User has not set up secret questions') {
        errorCb(payload.email);
      }
    }
  });

  const onSubmit = (data) => mutate(data);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="Email"
        autoComplete="false"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        error={errors.email && 'Email is required'}
      />
      <Input
        type="password"
        label="Password"
        id="password"
        autoComplete="false"
        {...register('password', { required: true })}
        error={errors.email && 'Password is required'}
      />
      <div className="flex justify-end my-5">
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium grooming-text">
            Forgot your password?
          </Link>
        </div>
      </div>
      <div className="pt-5">
        <Button disabled={isLoading} isFullWidth type="submit">
          Sign in
        </Button>
      </div>
    </form>
  );
};
