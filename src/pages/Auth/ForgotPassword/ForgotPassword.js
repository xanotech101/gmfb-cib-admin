import { useState } from 'react';
import classnames from 'classnames';
import { Auth } from 'components/Layout';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useModal } from 'hooks/useModal';
import { Button } from 'components/Button/Button';

export const ForgotPassword = () => {
  const { showModal, Modal } = useModal();

  const [response, setResponse] = useState('');
  const [isError, setIsError] = useState(false);

  const formSubmitCallback = (response, isError) => {
    setResponse(response);
    setIsError(isError);
    showModal();
  };

  const Icon = isError ? XMarkIcon : CheckIcon;

  return (
    <Auth title="Recover Password">
      <ForgotPasswordForm callback={formSubmitCallback} />
      {Modal({
        children: (
          <>
            <div
              className={classnames(
                'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
                {
                  'bg-red-100': isError,
                  'bg-green-100': !isError
                }
              )}
            >
              <Icon
                className={classnames('h-6 w-6', {
                  'text-green-600': !isError,
                  'text-red-600': isError
                })}
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {isError ? 'Email not sent' : 'Email sent'}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{response}</p>
              </div>
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
    </Auth>
  );
};
