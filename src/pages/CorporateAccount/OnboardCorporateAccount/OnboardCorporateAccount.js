import { Container } from 'components/Container/Container';
import OnboardingForm from './OnboardingForm';

export const OnboardCorporateAccount = () => {
  return (
    <div className="lg:w-[60%] w-full p-6">
      <Container>
        <div className="mb-10 border-b pb-2">
          <h1 className="text-2xl font-medium leading-6 text-gray-900 mb-3">
            Onboard Corporate Account
          </h1>
          <p className="font-medium">Fill in corporate account details</p>
        </div>
        <OnboardingForm />
      </Container>
    </div>
  );
};
