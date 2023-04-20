import React from 'react';
import { useForm } from 'react-hook-form';
import { TextArea } from 'components/Form/TextArea/TextArea';
import { Button } from 'components/Button/Button';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ticketService } from 'services';
import { useParams } from 'react-router-dom';

export const AddResponse = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { isLoading, mutate } = useMutation((data) => ticketService.replyToTicket(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket-details']);
      reset();
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        id="response"
        label="Response"
        {...register('response', { required: true })}
        error={errors.response && 'response is required'}
      />
      <div className="mt-6">
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};
