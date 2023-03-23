import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { useMutation } from '@tanstack/react-query';

export const RespondToSecurityQuestionForm = ({
  question,
  apiEndpoint,
  successCb,
  errorCb,
  requestPayload
}) => {
  console.log('🚀 ~ file: RespondToSecurityQuestionForm.js:14 ~ question:', question);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => apiEndpoint(data, errorCb),
    onSuccess: () => {
      successCb?.();
    },
    onError: () => {
      setValue('answer', '');
    }
  });

  const onSubmit = (data) => {
    mutate({ ...requestPayload, ...data, question: question?._id });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Question" disabled value={question?.question ?? ''} onChange={() => {}} />
      <Input
        label="Answer"
        {...register('answer', { required: true })}
        error={errors['answer'] ? 'This field is required' : ''}
      />
      <div className="pt-5">
        <Button disabled={isLoading} isFullWidth type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
