import { Container } from 'components/Container/Container';
import { Heading } from 'components/Header/Heading';
import { auditService } from 'services';
import { AuditTrail } from 'components/AuditTrails/AuditTrails';

export const Audit = () => {
  return (
    <div className="p-5">
      <Container>
        <Heading>Audit Trail</Heading>
        <AuditTrail queryFunc={auditService.getAllAuditTrails} />
      </Container>
    </div>
  );
};
