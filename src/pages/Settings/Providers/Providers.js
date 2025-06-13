import { Container } from 'components/Container/Container';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';

export const Providers = () => {
  const { control } = useForm();
  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <Select
          label="Bulk Payment Provider"
          name="bulk-payment-provider"
          isMulti={false}
          placeholder="Select a provider"
          control={control}
          options={[
            { label: 'Paystack', value: 'paystack' },
            { label: 'EasyPay', value: 'easypay' },
            { label: 'Bank One', value: 'bank_one' }
          ]}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Container>
  );
};
