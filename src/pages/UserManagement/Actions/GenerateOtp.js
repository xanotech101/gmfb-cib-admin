import { useMutation } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';

import { Input } from 'components/Form/Input/Input';
import { useState } from 'react';
import { otpService } from 'services';

const GenerateOtp = ({ type, setOtp, children, otp }) => {
  const [generateOtp, setGenerateOtp] = useState(true);
  const handleOtpGeneration = useMutation({
    mutationFn: () => otpService.generateOtp(type),
    onSuccess: () => {
      setGenerateOtp(false);
    },
    onError: () => {}
  });

  return (
    <form className="space-y-6">
      <div>
        <Input
          label="Enter OTP (OTP will be sent to your registered email and phone number)"
          name="otp"
          type="text"
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />

        {(!generateOtp || otp) && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-primary disabled:cursor-not-allowed disabled:opacity-50 text-sm mt-1 underline"
              disabled={handleOtpGeneration.isLoading}
              onClick={() => {
                setOtp(null);
                handleOtpGeneration.mutate();
              }}>
              {handleOtpGeneration.isLoading ? 'Regenerating OTP ...' : 'Regenerate OTP'}
            </button>
          </div>
        )}

        {generateOtp && !otp ? (
          <div className="mt-5">
            <Button
              type="button"
              isFullWidth
              disabled={handleOtpGeneration.isLoading}
              onClick={() => {
                setOtp(null);
                handleOtpGeneration.mutate();
              }}>
              Generate OTP
            </Button>
          </div>
        ) : (
          children
        )}
      </div>
    </form>
  );
};

export default GenerateOtp;
