import { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { transactionService } from 'services';
import { TransactionRequestTable } from './TransactionRequestTable';
import { EmptyState } from 'components/EmptyState/EmptyState';

const RenderData = ({ data }) => {
  const navigate = useNavigate();
  if (data?.requests?.length === 0) {
    return (
      <EmptyState
        title="No transaction request found"
        description="You are yet any transaction request yet. Click the button below to get started."
        action={{
          label: 'Initiate transaction request',
          onClick: () => navigate('/transaction-requests/initiate')
        }}
      />
    );
  } else {
    return <TransactionRequestTable transactions={data?.requests ?? []} />;
  }
};

export const TransactionRequest = () => {
  const path = useLocation().pathname;
  const requestService = useMemo(() => {
    if (path.includes('assigned')) {
      return transactionService.getAssignedRequests;
    } else if (path.includes('initiated')) {
      return transactionService.getAllInitiatedRequests;
    }
    return transactionService.getTransactionPerOrganization;
  }, [path]);

  const { data, isFetching } = useQuery({
    queryKey: ['transaction-requests', path],
    queryFn: () => requestService()
  });

  return (
    <div className="pt-4 overflow-auto px-5 lg:px-0">
      <div className="lg:pl-6 lg:pr-4 md:pr-0 md:pl-0">
        <Container>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Transaction Requests</h1>
              <p className="text-sm text-gray-700">
                List of transaction requests within the system.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 flex space-x-3">
              <Link to="/transaction-requests/initiate">
                <Button>Initiate Request</Button>
              </Link>
              <Link to="/transaction-requests/batchupload">
                <Button variant="black" type="button">
                  Batch Upload
                </Button>
              </Link>
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
