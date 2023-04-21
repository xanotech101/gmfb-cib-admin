import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { auditService } from 'services';
import { AuditData } from './AuditData';
import Pagination from 'components/Pagination/Pagination';

export const Audit = ({ style = 'py-5 pl-5 pr-4' }) => {
  const [page, setPage] = useState(1);
  const { data, meta } = useQuery({
    queryKey: ['getOrganizationAuditTrails', { page }],
    queryFn: () => auditService.getOrganizationAuditTrails({ page })
  });

  return (
    <div className={`${style}`}>
      <Container>
        <Heading>Audit Trail</Heading>
        <div className="user-list">
          <AuditData data={data} />
        </div>
        <Pagination totalItems={meta?.total} handlePageClick={setPage} />
      </Container>
    </div>
  );
};
