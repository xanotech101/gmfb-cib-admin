import { Container } from 'components/Container/Container';
import { LinkButton } from 'components/Button/LinkRouteButton';
import { MandateRuleForm } from '../components/MandateRuleForm/MandateRuleForm';

export const CreateMandateRule = () => {
  return (
    <div className="lg:w-[70%] w-full p-6">
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
