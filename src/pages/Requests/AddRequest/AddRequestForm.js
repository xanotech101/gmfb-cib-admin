import { Button } from 'components/Button/Button';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';
import React from 'react';
import { TextArea } from 'components/Form/TextArea/TextArea';
import { Input } from 'components/Form/Input/Input';

const AddRequestForm = () => {
  const { control } = useForm();
  return (
    <div>
      <form action="" className="space-y-7">
        <Select
          label="Select Request"
          name="select request"
          control={control}
          options={[
            {
              value: 'Transaction Failure',
              label: 'transaction failure'
            },
            {
              value: 'Transfer Request Error',
              label: 'transfer request error'
            },
            {
              value: 'Account Settings',
              label: 'account settings'
            },
            {
              value: 'User Management',
              label: 'user management'
            }
          ]}
        />
        <Input label="Authorisers ID" />
        <TextArea placeholder="Enter request....." />
        <Button isFullWidth>Submit</Button>
      </form>
    </div>
  );
};

export default AddRequestForm;
