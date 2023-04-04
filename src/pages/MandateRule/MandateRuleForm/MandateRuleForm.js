import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Form/Input/Input';
import { mandateService, userService } from 'services';
import { useNavigate } from 'react-router-dom';
import { Select } from 'components/Form/Select/Select';
import { useCallback } from 'react';

export const MandateRuleForm = ({ defaultValues = {}, type = 'create' }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValues }
  });

  const { data: authorizers } = useQuery({
    queryKey: ['authorizers'],
    queryFn: () =>
      userService.getBranchUsers({
        privilege: 'authoriser'
      })
  });

  const { data: verifiers } = useQuery({
    queryKey: ['verifiers'],
    queryFn: () =>
      userService.getBranchUsers({
        privilege: 'verifier'
      })
  });

  const transformData = useCallback((data) => {
    return data.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id
    }));
  }, []);

  const { isLoading, mutate } = useMutation(
    (data) => (type === 'create' ? mandateService.create(data) : mandateService.update(data)),
    {
      onSuccess: () => {
        navigate('/mandate-rule');
      }
    }
  );

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      authorisers: data.authorisers.map((authorizer) => authorizer.value),
      verifier: data.verifier.value
    };
    mutate(payload);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        id="name"
        {...register('name', { required: true })}
        error={errors.name && 'Name is required'}
      />
      <Input
        label="Min Amount"
        id="min_amount"
        {...register('minAmount', { required: true })}
        error={errors.minAmount && 'Min Amount is required'}
      />
      <Input
        label="Max Amount"
        id="max_amount"
        {...register('maxAmount', { required: true })}
        error={errors.maxAmount && 'Max Amount is required'}
      />
      <Select
        label="Authorizers"
        name="authorisers"
        control={control}
        options={transformData(authorizers ?? [])}
        isMulti
        error={errors.authorisers && 'authorisers are required'}
      />
      <Select
        label="Verifier"
        name="verifier"
        control={control}
        options={transformData(verifiers ?? [])}
        error={errors.verifiers && 'Verifier are required'}
      />
      <div className="pt-5">
        <Button type="submit" variant="primary" disabled={isLoading} isFullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
};
