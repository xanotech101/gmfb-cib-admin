import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Header/Heading';
import { auditService } from 'services';
import { AuditTrailTable } from './AuditTrailTable';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { useTableSerialNumber } from 'hooks';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';

const RenderData = ({ data, initialSerialNumber }) => {
  if (!data || data?.trails?.length === 0) {
    return (
      <EmptyState
        title="No trails found"
        description="Organization activity will be shown here."
        showAction={false}
      />
    );
  } else {
    return <AuditTrailTable data={data} initialSerialNumber={initialSerialNumber} />;
  }
};

export const Audit = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['getOrganizationAuditTrails', { page }],
    queryFn: () => auditService.getOrganizationAuditTrails({ page, type: searchValue }),
    onSuccess: (data) => {
      setPage(data?.meta?.page ? Number(data?.meta?.page) : 1);
    }
  });
  console.log(data);
  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <div className="p-5">
      <Container>
        <Heading>Audit Trail</Heading>
        <div className="space-y-6">
          <SearchFilter
            placeholder={'Search by type....'}
            value={searchValue}
            setValue={setSearchValue}
            onSearch={refetch}
          />
        </div>
        <p className="text-sm text-gray-700">Actions performed by users within the system</p>
        {isFetching ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <>
            <RenderData data={data} initialSerialNumber={initialSerialNumber} />
            <Pagination
              totalItems={data?.meta?.total}
              handlePageClick={setPage}
              currentPage={page}
            />
          </>
        )}
      </Container>
    </div>
  );
};
