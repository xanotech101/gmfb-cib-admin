import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import Pagination from 'components/Pagination/Pagination';
import { useTableSerialNumber } from 'hooks';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { apiUsageService } from 'services/apiUsage.service';
import { BvnUsageTable } from './components/BvnUsageTable';
import DatePicker from 'react-datepicker';
import { Label } from 'components/Form/Label/Label';

const RenderData = ({ data, initialSerialNumber, total }) => {
  if (data?.results?.length === 0 || !data) {
    return (
      <EmptyState title="No BVN Api created" description="You have not created any bvn api yet." />
    );
  } else {
    return <BvnUsageTable data={data} initialSerialNumber={initialSerialNumber} total={total} />;
  }
};

export const BvnTable = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['console', page],
    queryFn: () => apiUsageService.getApiUsage({ page, name: searchValue })
  });

  const _id = data?.results?.map((datum) => datum?._id);

  const { data: thirdparty } = useQuery({
    queryKey: ['enquiry', _id, { date: year, requesttype: 'Bvn' }],
    queryFn: () => apiUsageService.getApi(_id, { date: year, requesttype: 'Bvn' })
  });
  const sumOfRequests = thirdparty?.analytics?.reduce(
    (total, obj) => total + obj.numberOfRequests,
    0
  );
  const initialSerialNumber = useTableSerialNumber(page);
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
          <RenderData data={data} initialSerialNumber={initialSerialNumber} total={sumOfRequests} />
          <Pagination totalItems={data?.meta?.total} handlePageClick={setPage} currentPage={page} />
        </>
      )}
    </>
  );
};
