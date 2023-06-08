import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TransferRequestsTable } from '../components/TransferRequestsTable';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { transactionService } from 'services';
import { EmptyState } from 'components/EmptyState/EmptyState';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { Container } from 'components/Container/Container';
import { Filter } from '../components/Filter';
import { useTableSerialNumber } from 'hooks';

const RenderData = ({ data, initialSerialNumber }) => {
  if (data?.requests?.length === 0 || !data) {
    return (
      <EmptyState
        title="No request found"
        description="No request found, please check back later."
      />
    );
  } else {
    return (
      <TransferRequestsTable
        transactions={data?.requests ?? []}
        initialSerialNumber={initialSerialNumber}
      />
    );
  }
};

export const AllTransferRequests = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState({ id: 6, name: 'All', value: null });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-transfer-requests', page, selectedStatus.value],
    queryFn: () =>
      transactionService.getAllTransactions({
        page,
        status: selectedStatus.value,
        search: searchValue
      })
  });
  console.log(data);
  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <div className="flex flex-col mt-7 p-5">
      <Container>
        <div className="sm:flex sm:items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">All transfer request</h1>
            <p className="text-sm text-gray-700">List of transfer requests in this account.</p>
          </div>
          <div>
            <Filter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
          </div>
        </div>
        <div className="space-y-6">
          <SearchFilter
            placeholder={'Search by reference or amount....'}
            value={searchValue}
            setValue={setSearchValue}
            onSearch={refetch}
          />
          {isLoading ? (
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
        </div>
      </Container>
    </div>
  );
};
