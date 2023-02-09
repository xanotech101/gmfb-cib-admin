import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';
import { Button } from 'components/Button/Button';
import { TextArea } from 'components/Form/TextArea/TextArea';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { transactionService } from 'services';

export const DeclineTransactionForm = ({ callback }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => transactionService.declineTransactionRequest(payload),
    onSuccess: () => {
      callback();
      queryClient.invalidateQueries({
        queryKey: ['transaction-requests', id],
        exact: true
      });
    }
  });

  const onSubmit = (data) => {
    mutate({ id, reason: data.reason });
  };

  return (
    <>
      <Heading>Why do you want to decline this request?.</Heading>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            id="reason"
            placeholder="Drop a response......"
            {...register('reason', { required: true })}
            error={errors.reason && 'Reason is required'}
          />
          <div className="pt-10">
            <Button type="submit" disabled={isLoading}>
              Submit Response
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
