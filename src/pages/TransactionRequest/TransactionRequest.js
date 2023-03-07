import ContentLoader from 'react-content-loader';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { transactionService } from 'services';
import { TransactionRequestTable } from './TransactionRequestTable';
import { Heading } from 'components/Common/Header/Heading';
export const TransactionRequest = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['transaction-requests'],
    queryFn: transactionService.getTransactionRequests
  });

  return (
    <div className="mt-10 overflow-auto px-5 lg:px-0">
      <div className="lg:pl-6 lg:pr-4 md:pr-0 md:pl-0">
        <Container>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <Heading>Transaction Requests</Heading>
              <p className="text-sm text-gray-700">
                List of transaction requests within the system.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link to="/transaction-requests/initiate">
                <Button>Initiate Request</Button>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            {isFetching ? (
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            ) : (
              <TransactionRequestTable items={data?.data ?? []} />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
