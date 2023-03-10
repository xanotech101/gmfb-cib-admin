import { Button } from 'components/Button/Button';
import React from 'react';
import { Input } from 'components/Form/Input/Input';
const OnboardingForm = () => {
  return (
    <div className='space-y-6'>
      <Input
        label="Account Number"
        id="account_number"
      />
      <Button isFullWidth>Submit</Button>
    </div>
  );
};

export default OnboardingForm;
