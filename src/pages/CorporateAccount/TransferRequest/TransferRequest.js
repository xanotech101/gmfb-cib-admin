import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Container } from 'components/Container/Container';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { transactionService } from 'services';
import { TransferRequestTable } from './TransferRequestTable';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';

const RenderData = ({ data }) => {
  if (data?.requests?.length === 0) {
    return (
      <EmptyState
        title="No transaction request found"
        description="You are yet any transaction request yet. Click the button below to get started."
      />
    );
  } else {
    return <TransferRequestTable transactions={data?.requests ?? []} />;
  }
};

export const TransferRequest = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [branchName] = useState(state?.data?.accountName);

  const { data, isFetching } = useQuery({
    queryKey: ['transaction-requests', id],
    queryFn: () =>
      transactionService.getTransactionPerOrganization({
        branchId: id
      })
  });

  return (
    <div className="pt-4 overflow-auto px-5 lg:px-0">
      <div className="lg:pl-6 lg:pr-4 md:pr-0 md:pl-0">
        <Container>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Transfer Requests in <strong>{branchName}.</strong>
              </h1>
              <p className="text-sm text-gray-700">List of transfer requests within the system</p>
            </div>
          </div>
          <div className="mt-4 w-[40%]">
            <SearchFilter placeholder={'Search awaiting transfers...'} />
          </div>
          <div className="mt-5">
            {isFetching ? (
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            ) : (
              <RenderData data={data} />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
