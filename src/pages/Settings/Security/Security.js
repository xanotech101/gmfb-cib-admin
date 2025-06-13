import { Container } from 'components/Container/Container';
import UpdateSecurityQuestion from './UpdateSecurityQuestion';
import { UpdatePassword } from './UpdatePassword';

export const Security = () => {
  return (
    <Container>
      <UpdatePassword />
      <hr className="my-8" />
      <UpdateSecurityQuestion />
    </Container>
  );
};
