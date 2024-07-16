import { useState } from 'react';

export const useHandleNextStep = (totalSteps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return { handleNextStep, handlePreviousStep, currentStep, setCurrentStep };
};
