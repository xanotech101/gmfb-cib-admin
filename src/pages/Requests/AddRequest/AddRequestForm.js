import { Button } from 'components/Button/Button';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';
import React from 'react';
import { TextArea } from 'components/Form/TextArea/TextArea';
import { Input } from 'components/Form/Input/Input';
import { ticketService } from 'services';
import { useMutation } from '@tanstack/react-query';

const AddRequestForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();

  const { isLoading, mutate } = useMutation((data) => ticketService.create(data));
  const isTRansactionError = watch('topic')?.value === 'Transfer Request Error';

  const onSubmit = (data) => {
    const payload = {
      ...data,
      topic: data.topic.value,
      meta: {
        transactionId: data.transactionId
      }
    };
    mutate(payload);
  };

  return (
    <div>
      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Select Ticket Topic"
          name="topic"
          control={control}
          options={[
            {
              value: 'Transfer Request Error',
              label: 'Transfer Request Error'
            },
            {
              value: 'Account Settings',
              label: 'Account settings'
            },
            {
              value: 'User Management',
              label: 'User Management'
            }
          ]}
        />
        {isTRansactionError && (
          <Input
            label="Transaction Id"
            {...register('transactionId', { required: false })}
            error={errors.transactionId && 'Transaction Id is required'}
          />
        )}
        <TextArea
          id="message"
          label="Message"
          {...register('message', { required: true })}
          error={errors.message && 'message is required'}
        />
        <Button type="submit" isFullWidth disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddRequestForm;
