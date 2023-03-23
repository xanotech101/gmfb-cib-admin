import React from 'react';
import SecurityQuestionForm from 'components/SecurityQuestion/SecurityQuestionForm';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { securityService } from 'services';
import { useMutation } from '@tanstack/react-query';

export const CreateSecurityQuestionForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation(
    (data) => securityService.createSecurityQuestions(data),
    {
      onSuccess: () => {
        navigate('/');
      }
    }
  );

  const onSubmit = (data) => {
    const payload = [
      {
        question: data['question-1'].value,
        answer: data['answer-1']
      },
      {
        question: data['question-2'].value,
        answer: data['answer-2']
      },
      {
        question: data['question-3'].value,
        answer: data['answer-3']
      }
    ];

    mutate({ email: state.email, secretQuestions: payload });
  };

  if (!state?.email) {
    // return an error here asking the user to go back to the previous page
  }

  return (
    <form className="p-8 border bg-white rounded-xl space-y-12" onSubmit={handleSubmit(onSubmit)}>
      <SecurityQuestionForm control={control} errors={errors} register={register} watch={watch} />
      <Button type="submit" isFullWidth disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
};
