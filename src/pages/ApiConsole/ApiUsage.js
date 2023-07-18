import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';
import DatePicker from 'react-datepicker';
import ContentLoader from 'react-content-loader';
import { apiUsageService } from 'services/apiUsage.service';
import { ApiUsageTable } from './components/ApiUsageTable';
import { Label } from 'components/Form/Label/Label';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useState } from 'react';
import { useTableSerialNumber } from 'hooks';
import Pagination from 'components/Pagination/Pagination';

const RenderData = ({ data, initialSerialNumber, total }) => {
  if (data?.results?.length === 0 || !data) {
    return (
      <EmptyState
        title="No Records to show"
        description="Api usage across different branches would be rendered here"
      />
    );
  } else {
    return <ApiUsageTable data={data} initialSerialNumber={initialSerialNumber} total={total} />;
  }
};

export const ApiTable = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['console', page],
    queryFn: () => apiUsageService.getApiUsage({ page, name: searchValue })
  });

  const _id = data?.results?.map((datum) => datum?._id);

  const { data: data2 } = useQuery({
    queryKey: ['enquiry', _id, { year }],
    queryFn: () => apiUsageService.getApi(_id, { date: year, requesttype: 'NameEnquiry' })
  });

  const initialSerialNumber = useTableSerialNumber(page);

  const sumOfRequests = data2?.analytics?.reduce((total, obj) => total + obj.numberOfRequests, 0);

  return (
    <>
      <div className="flex items-center justify-between">
        <SearchFilter
          placeholder={'Search...'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={refetch}
        />
        <div className="w-[200px]">
          <Label label="Select Year" />
          <DatePicker
            selected={new Date(year, 0, 1)}
            showMonthDropdown
            onChange={(date) => {
              setYear(date.getFullYear());
              refetch();
            }}
            showYearPicker
            dateFormat="yyyy"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>
      </div>
      {isLoading || isFetching ? (
        <ContentLoader viewBox="0 0 380 70">
          <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
        </ContentLoader>
      ) : (
        <>
          <RenderData data={data} total={sumOfRequests} initialSerialNumber={initialSerialNumber} />
          <Pagination totalItems={data?.meta?.total} handlePageClick={setPage} currentPage={page} />
        </>
      )}
    </>
  );
};
