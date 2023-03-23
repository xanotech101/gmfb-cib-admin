import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';
import { Button } from 'components/Button/Button';
import { TextArea } from 'components/Form/TextArea/TextArea';
import { useMutation } from '@tanstack/react-query';
import { otpService } from 'services';
import { OTPContexts } from 'constants/otpContexts';
import { Input } from 'components/Form/Input/Input';

export const FeedbackForm = ({ callback, title, isSubmitting }) => {
  // const queryClient = useQueryClient();
  const { id } = useParams();
  const [generateOtp, setGenerateOtp] = useState(true);
  const [otp, setOtp] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: (payload) => transactionService.declineTransactionRequest(payload),
  //   onSuccess: () => {
  //     console.log('success');
  //     callback();
  //     queryClient.invalidateQueries({
  //       queryKey: ['transaction-requests', id],
  //       exact: true
  //     });
  //   }
  // });

  const handleOtpGeneration = useMutation({
    mutationFn: () =>
      otpService.generateOtp({
        context: OTPContexts.transaction,
        transaction: id
      }),
    onSuccess: () => {
      setGenerateOtp(false);
    }
  });

  const handleOtpRegeneration = useMutation({
    mutationFn: () =>
      otpService.regenerateOtp({ context: OTPContexts.transaction, transaction: id })
  });

  const onSubmit = (data) => {
    callback({ ...data, otp, id });
  };

  return (
    <>
      <Heading>{title}</Heading>
      <div className="mt-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextArea
            id="reason"
            label="Reason"
            {...register('reason', { required: true })}
            error={errors.reason && 'Reason is required'}
          />
          <div>
            <Input label="Enter Otp" onChange={(e) => setOtp(e.target.value)} value={otp} />
            {!generateOtp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={handleOtpRegeneration.isLoading}
                  onClick={handleOtpRegeneration.mutate}
                >
                  {handleOtpRegeneration.isLoading ? 'Regenerating OTP ...' : 'Regenerate OTP'}
                </button>
              </div>
            )}
          </div>
          <div className="mt-5">
            {generateOtp ? (
              <Button
                type="button"
                isFullWidth
                disabled={handleOtpGeneration.isLoading}
                onClick={handleOtpGeneration.mutate}
              >
                Generate OTP
              </Button>
            ) : (
              <Button
                type="submit"
                isFullWidth
                disabled={isSubmitting || handleOtpRegeneration.isLoading}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
