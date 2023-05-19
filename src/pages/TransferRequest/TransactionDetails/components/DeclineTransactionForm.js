import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Heading } from 'components/Header/Heading';
import { Button } from 'components/Button/Button';
import { TextArea } from 'components/Form/TextArea/TextArea';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { transactionService } from 'services';
import { Otp } from './Otp/Otp';
import { useState } from 'react';

export const DeclineTransactionForm = ({ callback }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [otp, setOtp] = useState('hidden');
  const [text, setText] = useState('Next');
  const DisplayOtp = () => {
    setOtp('block');
    setText('Submit Response');
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => transactionService.declineTransactionRequest(payload),
    onSuccess: () => {
      console.log('success');
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
      <Heading>Why do you want to decline this request?</Heading>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            id="reason"
            placeholder="Drop a response......"
            {...register('reason', { required: true })}
            error={errors.reason && 'Reason is required'}
          />
          <div className={otp}>
            <Otp />
          </div>
          <div className=" mt-3">
            <Button type="submit" isFullWidth disabled={isLoading} onClick={DisplayOtp}>
              {text}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
