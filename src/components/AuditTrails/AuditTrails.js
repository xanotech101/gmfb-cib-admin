import { EmptyState } from 'components/EmptyState/EmptyState';
import { useTableSerialNumber } from 'hooks/useTableSerialNumber';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuditTrailsTable } from './AuditTrailsTable';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import ContentLoader from 'react-content-loader';
import Pagination from 'components/Pagination/Pagination';

const RenderData = ({ initialSerialNumber, data }) => {
  if (data?.trails?.length === 0 || !data) {
    return (
      <EmptyState
        title="No Audit Trail found"
        description="Actions performed by users of your organization will be displayed here."
      />
    );
  } else {
    return <AuditTrailsTable data={data?.trails ?? []} initialSerialNumber={initialSerialNumber} />;
  }
};

export const AuditTrail = ({
  queryKey = 'getOrganizationAuditTrails',
  queryFunc,
  otherParams = {}
}) => {
  const [searchValue, setSearchValue] = useState(undefined);
  const [page, setPage] = useState(1);

  const shouldEnableQuery = useMemo(() => {
    if (Object.keys(otherParams).length === 0) {
      return true;
    } else {
      return !!otherParams.userId || !!otherParams.organizationId;
    }
  }, [otherParams]);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [queryKey, page, otherParams.id],
    queryFn: () => queryFunc({ ...otherParams, page, type: searchValue }),
    enabled: shouldEnableQuery
  });

  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <>
      <SearchFilter
        placeholder={'Search by action...'}
        value={searchValue}
        setValue={setSearchValue}
        onSearch={() => {
          page !== 1 ? setPage(1) : refetch();
        }}
      />
      {isLoading || isFetching ? (
        <div className="mt-5">
          <ContentLoader viewBox="0 0 380 70">
            <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
          </ContentLoader>
        </div>
      ) : (
        <>
          <RenderData data={data} initialSerialNumber={initialSerialNumber} />
          <Pagination
            totalItems={data?.meta?.total ?? 0}
            handlePageClick={setPage}
            currentPage={page}
          />
        </>
      )}
    </>
  );
};
