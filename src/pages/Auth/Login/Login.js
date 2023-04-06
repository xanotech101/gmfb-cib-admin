import { useState } from 'react';
import { Auth } from 'components/Layout';
import { useModal } from 'hooks';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { RespondToSecurityQuestionForm } from 'components/SecurityQuestion/RespondToSecurityQuestionForm';
import { authService } from 'services';

export const Login = () => {
  const navigate = useNavigate();
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
