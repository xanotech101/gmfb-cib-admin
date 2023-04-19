import { Container } from 'components/Container/Container';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Button } from 'components/Button/Button';
import SecurityQuestionForm from 'components/SecurityQuestion/SecurityQuestionForm';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from 'services';
import { useModal } from 'hooks';
import { Input } from 'components/Form/Input/Input';

const UpdateSecurityQuestion = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();

  const { showModal, Modal } = useModal();
  const { mutate, isLoading } = useMutation((data) => authService.updateSecurityQuestion(data), {
    onSettled: () => {
      showModal();
    }
  });

  const onSubmit = (data) => {
    const secretQuestions = [
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

    const payload = {
      secrets: secretQuestions,
      password: data.password
    };

    mutate(payload);
  };

  return (
    <div className="space-y-8 w-400">
      <Container>
        <SubHeading>Update your security Questions</SubHeading>
        <p className="mt-3 mb-4">Please be careful while choosing your security questions.</p>
        <form className="space-y-6">
          <SecurityQuestionForm
            control={control}
            errors={errors}
            register={register}
            watch={watch}
          />
          <Button type="button" isFullWidth disabled={isLoading} onClick={showModal}>
            Submit
          </Button>
        </form>
      </Container>
      {Modal({
        children: (
          <div className="space-y-4">
            <Input
              label="Password"
              type="password"
              id="password"
              {...register('password', { required: false })}
              error={errors.password ? 'This field is required' : ''}
            />
            <Button type="button" isFullWidth disabled={isLoading} onClick={handleSubmit(onSubmit)}>
              Update security questions
            </Button>
          </div>
        )
      })}
    </div>
  );
};

export default UpdateSecurityQuestion;
