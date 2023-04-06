import { Auth } from 'components/Layout';
import { CreateSecurityQuestionForm } from './CreateSecurityQuestionForm';

export const CreateSecurityQuestion = () => {
  return (
    <Auth title="Create security questions">
      <CreateSecurityQuestionForm />
    </Auth>
  );
};
