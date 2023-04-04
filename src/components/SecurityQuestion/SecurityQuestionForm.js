import React, { useMemo } from 'react';
import { Select } from 'components/Form/Select/Select';
import { Input } from 'components/Form/Input/Input';
import { useQuery } from '@tanstack/react-query';
import { securityService } from 'services';

const SecurityQuestionForm = ({ control, register, errors, watch }) => {
  const { data } = useQuery({
    queryKey: ['security-questions'],
    queryFn: () => securityService.getSecurityQuestions()
  });

  const selectedQuestionOne = watch('question-1')?.value ?? '';
  const selectedQuestionTwo = watch('question-2')?.value ?? '';
  const selectedQuestionThree = watch('question-3')?.value ?? '';

  const options = useMemo(() => {
    const selectedQuestions = [selectedQuestionOne, selectedQuestionTwo, selectedQuestionThree];
    const formattedOptions = data?.securityQuestions?.map((question) => ({
      value: question._id,
      label: question.question
    }));

    return formattedOptions?.filter((option) => !selectedQuestions.includes(option.value));
  }, [data, selectedQuestionOne, selectedQuestionTwo, selectedQuestionThree]);

  return (
    <div className="space-y-8">
      {Array(3)
        .fill(3)
        .map((_, index) => (
          <div key={index} className="space-y-4">
            <Select
              label="Question"
              name={`question-${index + 1}`}
              control={control}
              options={options ?? []}
              error={errors[`question-${index + 1}`] ? 'This field is required' : ''}
            />
            <Input
              label="Answer"
              {...register(`answer-${index + 1}`, { required: true })}
              error={errors[`answer-${index + 1}`] ? 'This field is required' : ''}
            />
          </div>
        ))}
    </div>
  );
};

export default SecurityQuestionForm;
