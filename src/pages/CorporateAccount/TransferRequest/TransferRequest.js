import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Container } from 'components/Container/Container';
import { useLocation, useParams } from 'react-router-dom';
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
  const { state } = useLocation();
  const [searchValue, setSearchValue] = useState(undefined);
  const [branchName] = useState(state?.data?.accountName);
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
    <div className="pt-4 overflow-auto px-5 lg:px-0">
      <div className="lg:pl-6 lg:pr-4 md:pr-0 md:pl-0">
        <Container>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Transfer Requests in <strong>{branchName}</strong>
              </h1>
              <p className="text-sm text-gray-700">List of transfer requests within the system</p>
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
        </Container>
      </div>
    </div>
  );
};
