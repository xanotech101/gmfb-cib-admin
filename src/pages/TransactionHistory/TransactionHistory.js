import ContentLoader from 'react-content-loader';
import { Container } from 'components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import { accountService } from 'services';
import { TransactionRequestTable } from './TransactionRequestTable';
import { EmptyState } from 'components/EmptyState/EmptyState';

const RenderData = (data) => {
  if (data?.requests?.length === 0) {
    return (
      <EmptyState
        title="No transaction history found"
        description="You are yet to make any transaction yet. Click the button below to get started."
      />
    );
  } else {
    return <TransactionRequestTable transactions={data?.requests ?? []} />;
  }
};

export const TransactionHistory = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['transaction-history'],
    queryFn: accountService.getTransactionHistory
  });


  return (
    <div className="pt-6 overflow-auto px-5 lg:px-0">
      <div className="lg:pl-6 lg:pr-4 md:pr-0 md:pl-0">
        <Container>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Transaction History</h1>
              <p className="text-sm text-gray-700">
                List of transaction history within the system.
              </p>
            </div>
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
