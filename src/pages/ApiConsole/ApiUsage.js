import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';

import ContentLoader from 'react-content-loader';
import { apiUsageService } from 'services/apiUsage.service';
import { ApiUsageTable } from './components/ApiUsageTable';

import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useState } from 'react';
import { useTableSerialNumber } from 'hooks';
import Pagination from 'components/Pagination/Pagination';

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

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['console', page],
    queryFn: () => apiUsageService.getApiUsage({ page, name: searchValue })
  });

  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <>
      <div>
        <SearchFilter
          placeholder={'Search...'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={refetch}
        />
      </div>
      {isLoading || isFetching ? (
        <ContentLoader viewBox="0 0 380 70">
          <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
        </ContentLoader>
      ) : (
        <>
          <RenderData data={data} initialSerialNumber={initialSerialNumber} />
          <Pagination totalItems={data?.meta?.total} handlePageClick={setPage} currentPage={page} />
        </>
      )}
    </>
  );
};
