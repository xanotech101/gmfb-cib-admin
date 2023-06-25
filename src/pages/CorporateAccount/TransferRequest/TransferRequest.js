import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { transactionService } from 'services';
import { TransferRequestTable } from './TransferRequestTable';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { Filter } from './Filter';
import { useTableSerialNumber } from 'hooks';
import Pagination from 'components/Pagination/Pagination';

const RenderData = ({ data, initialSerialNumber }) => {
  if (data?.requests?.length === 0) {
    return (
      <EmptyState
        title="No transaction request found"
        description="You are yet any transaction request yet. Click the button below to get started."
      />
    );
  } else {
    return (
      <TransferRequestTable
        transactions={data?.requests ?? []}
        initialSerialNumber={initialSerialNumber}
      />
    );
  }
};

export const TransferRequest = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const [selectedStatus, setSelectedStatus] = useState({ id: 6, name: 'All', value: null });
  const initialSerialNumber = useTableSerialNumber(page);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['transfer-requests', id, selectedStatus.value, page],
    queryFn: () =>
      transactionService.getTransactionPerOrganization({
        branchId: id,
        status: selectedStatus.value,
        search: searchValue,
        page
      })
  });

  return (
    <div className="px-10 space-y-6 mt-8 pb-12 ">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium leading-6 text-gray-900 mt-4">Transfer Requests</h3>
        <div>
          <Filter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        </div>
      </div>
      <div>
        <SearchFilter
          placeholder={'Search by reference or amount....'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={refetch}
        />
        {isFetching ? (
          <ContentLoader viewBox="0 0 380 70">
            <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
          </ContentLoader>
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
    </div>
  );
};
