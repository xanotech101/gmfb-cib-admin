import { useQuery } from '@tanstack/react-query';
import { apiUsageService } from 'services/apiUsage.service';
import { APIKeyTable } from './components/APIKeyTable';
import { useTableSerialNumber } from 'hooks';
import { useState } from 'react';
import { EmptyState } from 'components/EmptyState/EmptyState';
import ContentLoader from 'react-content-loader';
import Pagination from 'components/Pagination/Pagination';

export const APIKEY = () => {
  const RenderData = ({ data, initialSerialNumber, refetch }) => {
    if (data?.results?.length === 0 || !data) {
      return (
        <EmptyState
          title="No Records to show"
          description="Api usage across different branches would be rendered here"
        />
      );
    } else {
      return (
        <APIKeyTable data={data} initialSerialNumber={initialSerialNumber} refetch={refetch} />
      );
    }
  };
  const [page, setPage] = useState(1);
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['thirdparty-organization', page],
    queryFn: () => apiUsageService.getApiUsage({ page })
  });
  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <div>
      <p className="mb-3 my-5 text-sm">
        Update your api key or generate new one for an organization using the action button.
      </p>
      {isFetching ? (
        <ContentLoader viewBox="0 0 380 70">
          <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
        </ContentLoader>
      ) : (
        <>
          <RenderData refetch={refetch} data={data} initialSerialNumber={initialSerialNumber} />
          <Pagination totalItems={data?.meta?.total} handlePageClick={setPage} currentPage={page} />
        </>
      )}
    </div>
  );
};
