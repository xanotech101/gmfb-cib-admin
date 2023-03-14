import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/Button/Button';
import { Auth } from 'components/Layout';
import { useEffect } from 'react';
import { authService } from 'services';
import { useModal } from 'hooks';
import { Heading } from 'components/Common/Header/Heading';

export const BulkVerification = () => {
  const { Modal, showModal } = useModal();
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate, isSuccess, isError, isIdle, isLoading } = useMutation({
    mutationFn: () => authService.verifyAccount(token)
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
            <div className="flex items-center flex-col justify-between">
              {Modal({
                children: (
                  <>
                    <div>
                      <Heading>Verification Failed</Heading>
                      <XCircleIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="mt-5">
                      <Button onClick={showModal} isFullWidth>
                        close
                      </Button>
                    </div>
                  </>
                ),
                showCloseIcon: false
              })}
            </div>
          )}
          {isSuccess && (
            <span className="flex items-center justify-between">
              Account Verification Successful
              <CheckCircleIcon className="text-green-500 w-12 h-12 flex-shrink-0" />
            </span>
          )}
        </>
      }
    >
      {isSuccess && (
        <div className="pt-3">
          <Button isFullWidth type="button" onClick={() => navigate('/')}>
            Login
          </Button>
        </div>
      )}
    </Auth>
  );
};
