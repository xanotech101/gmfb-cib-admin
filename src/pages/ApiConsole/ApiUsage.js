import { ClockIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import Pagination from 'components/Pagination/Pagination';
import { useTableSerialNumber } from 'hooks';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Enquiry } from 'services/api_console.service';
import { DateFormats, DateUtils } from 'utils';

const RenderData = ({ data, initialSerialNumber }) => {
  if (data?.results?.length === 0 || !data) {
    return <EmptyState title="No Api created" description="You have not created any api yet." />;
  } else {
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
              S/N
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
              Organization Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
              Number of Request
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
              time created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {data?.results?.map((datum, i) => (
            <tr key={datum?._id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                {initialSerialNumber + i}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                {datum?.organization_name.substring(0, 4)}
              </td>
              <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap border">
                {datum?.requestCount} Request
              </td>
              <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap ">
                <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                  <ClockIcon className=" h-5 w-5 flex-shrink-0  text-primary" aria-hidden="true" />
                  <div>
                    <p>
                      {datum?.createdAt
                        ? DateUtils.dateToString(
                            new Date(datum.createdAt),
                            DateFormats.frontendDateTime
                          )
                        : ''}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export const ApiTable = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['console', page],
    queryFn: () => Enquiry.getApiConsole({ page, name: searchValue })
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
        <RenderData data={data} initialSerialNumber={initialSerialNumber} />
      )}
      <Pagination totalItems={data?.meta?.total} handlePageClick={setPage} currentPage={page} />
    </>
  );
};
