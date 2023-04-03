import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TransactionRequestTable } from '../TransactionRequestTable';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { transactionService } from 'services';
import { EmptyState } from 'components/EmptyState/EmptyState';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';

const RenderData = ({ data, setPage }) => {
  if (data?.length === 0 || !data) {
    return (
      <EmptyState
        title="No request found"
        description="No request found, please check back later."
      />
    );
  } else {
    return (
      <>
        <TransactionRequestTable transactions={data?.requests ?? []} />
        <Pagination totalItems={data?.meta?.total ?? 0} handlePageClick={setPage} />
      </>
    );
  }
};

const Transfers = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['approved-transfers', page],
    queryFn: () => transactionService.getRequestSentToBankOne({ page })
  });

  return (
    <div className="space-y-6">
      <p>List of transfers made in corporate accounts</p>
      <div className="mt-4 w-[40%]">
        <SearchFilter placeholder={'Search verified transfers.....'} />
      </div>
      {isLoading ? (
        <div className="mt-5">
          <ContentLoader viewBox="0 0 380 70">
            <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
          </ContentLoader>
        </div>
      ) : (
        <RenderData data={data} setPage={setPage} />
      )}
    </div>
  );
};

export default Transfers;
