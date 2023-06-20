import { AuditTrail } from 'components/AuditTrails/AuditTrails';
import { useParams } from 'react-router-dom';
import { auditService } from 'services';

export const CorporateAuditTrails = () => {
  const { id: organizationId } = useParams();
  return (
    <div className="px-10 space-y-6 mt-8">
      <h3 className="text-xl font-medium leading-6 text-gray-900 mt-4">Audit Trails</h3>
      <AuditTrail
        queryFunc={auditService.getOrganizationAuditTrails}
        otherParams={{ organizationId }}
      />
    </div>
  );
};
