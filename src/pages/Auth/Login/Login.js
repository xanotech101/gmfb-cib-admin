import { useState } from 'react';
import { Auth } from 'components/Layout';
import { useModal } from 'hooks';
import { LoginForm } from './LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { RespondToSecurityQuestionForm } from 'components/SecurityQuestion/RespondToSecurityQuestionForm';
import { authService } from 'services';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const { Modal, showModal } = useModal();

  const handleLoginError = (err) => {
    if (err?.message === 'Incorrect answer') {
      setQuestion(err.data);
    }
  };

  return (
    <>
      <Auth title="Login to your admin account">
        {state?.message && (
          <div className="border-l-4 border-red-400 bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{state?.message}</p>
              </div>
            </div>
          </div>
        )}
        <LoginForm
          successCb={(payload) => {
            setEmail(payload.email);
            setQuestion(payload.questions);
            showModal();
          }}
          errorCb={(mail) =>
            navigate('/auth/create-security-questions', { state: { email: mail } })
          }
        />
      </Auth>
      {Modal({
        children: (
          <RespondToSecurityQuestionForm
            successCb={() => navigate('/dashboard')}
            question={question}
            requestPayload={{ email }}
            apiEndpoint={authService.login}
            errorCb={handleLoginError}
          />
        ),
        showCloseIcon: false
      })}
    </>
  );
};
