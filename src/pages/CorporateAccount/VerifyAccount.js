import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/Button/Button';
import { Auth } from 'components/Layout';
import { useEffect } from 'react';
import { accountService } from 'services';

export const AdminVerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, isIdle, isLoading } = useMutation({
    mutationFn: () => accountService.verifyAccount(token)
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <Auth
      title={
        <>
          {(isIdle || isLoading) && (
            <span className="flex items-center justify-between">Verifying Account ...</span>
          )}
          {isError && (
            <span className="flex items-center justify-between">
              Account Verification Failed
              <XCircleIcon className="text-red-500 w-12 h-12 flex-shrink-0" />
            </span>
          )}
          {isSuccess && (
            <span className="flex items-center justify-between">
              Account Verification Successful
              <CheckCircleIcon className="text-green-500 w-12 h-12 flex-shrink-0" />
            </span>
          )}
        </>
      }>
      {isSuccess && (
        <div className="pt-3">
          <Button isFullWidth type="button" onClick={() => navigate('/')}>
            Create security questions and password
          </Button>
        </div>
      )}
    </Auth>
  );
};
