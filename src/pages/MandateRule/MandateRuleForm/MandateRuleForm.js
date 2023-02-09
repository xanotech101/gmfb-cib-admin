import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Form/Input/Input';
import { mandateService, userService } from 'services';
import { useNavigate } from 'react-router-dom';
import { Select } from 'components/Form/Select/Select';

const options = [{ value: '63d03913dbf02914bfeb8ac7', label: 'Adenuga Tunmise' }];

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

  const { data } = useQuery({
    queryKey: ['branchUsers'],
    queryFn: () => userService.getBranchUsers()
  });

  console.log('🚀 ~ file: MandateRuleForm.js:26 ~ MandateRuleForm ~ data', data);

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
      AuthorizerID: data.authorizers.map((authorizer) => authorizer.value)
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
        name="authorizers"
        control={control}
        options={options}
        isMulti
        error={errors.authorizers && 'Authorizers are required'}
      />
      <div className="pt-5">
        <Button type="submit" variant="primary" disabled={isLoading} isFullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
};
