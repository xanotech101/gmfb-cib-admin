import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import Pagination from 'components/Pagination/Pagination';
import { useTableSerialNumber } from 'hooks';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { apiUsageService } from 'services/apiUsage.service';
import { ApiUsageTable } from './components/ApiUsageTable';

const RenderData = ({ data, initialSerialNumber }) => {
  if (data?.results?.length === 0 || !data) {
    return (
      <EmptyState
        title="No Records to show"
        description="Api usage across different branches would be rendered here"
      />
    );
  } else {
    return <ApiUsageTable data={data} initialSerialNumber={initialSerialNumber} />;
  }
};

export const ApiTable = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['api-usage', page],
    queryFn: () => apiUsageService.getApiUsage({ page, name: searchValue })
  });
  const initialSerialNumber = useTableSerialNumber(page);
  return (
    <>
      <SearchFilter
        placeholder={'Search...'}
        value={searchValue}
        setValue={setSearchValue}
        onSearch={refetch}
      />
      {isLoading || isFetching ? (
        <ContentLoader viewBox="0 0 380 70">
          <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
        </ContentLoader>
      ) : (
        <>
          <RenderData data={data} initialSerialNumber={initialSerialNumber} />
          <Pagination handlePageClick={setPage} currentPage={page} />
        </>
      )}
    </>
  );
};
