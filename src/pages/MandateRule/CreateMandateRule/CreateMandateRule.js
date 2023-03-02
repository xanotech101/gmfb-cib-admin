import { Container } from 'components/Container/Container';
import { LinkButton } from 'components/Button/LinkRouteButton';
import { MandateRuleForm } from '../MandateRuleForm/MandateRuleForm';

export const CreateMandateRule = () => {
  return (
    <div className="card px-8 mt-9 gap-5">
      <LinkButton to="/mandate-rule">Mandate Rule</LinkButton>
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Mandate Rule</h2>
        <p className="text-gray-900 mt-1">Please fill in your details below.</p>
        <div className="mt-8">
          <MandateRuleForm />
        </div>
      </Container>
    </div>
  );
};
