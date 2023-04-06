import { useQuery } from '@tanstack/react-query';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Container } from 'components/Container/Container';
import { useParams } from 'react-router-dom';
import { transactionService } from 'services';
import { TransferRequestDetailsList } from './components/TransferRequestDetailsList';
import { TransactionTimeLime } from './components/Timeline/AuthorizerTimeline';
import { VerifierTimeline } from './components/Timeline/VerifierTimeline';

export const TransferRequestDetails = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['transaction-requests', id],
    queryFn: () => transactionService.getTransactionById(id),
    enabled: !!id
  });

  return (
    <>
      <div className="lg:grid md:block sm:block block grid-cols-12 gap-5 px-8 mt-8 pb-6">
        <div className="col-span-12 flex justify-between items-center">
          <div>
            <SubHeading>Transfer Request Details</SubHeading>
          </div>
        </div>
        <div className="col-span-8">
          <Container>
            <TransferRequestDetailsList details={data} />
          </Container>
        </div>
        <div className="col-span-4 space-y-6">
          <TransactionTimeLime
            authorizers={data?.mandate?.authorisers ?? []}
            decisions={data?.authorisersAction ?? []}
          />
          <VerifierTimeline
            verifier={data?.mandate?.verifier ?? {}}
            decision={data?.verifierAction ?? {}}
          />
        </div>
      </div>
    </>
  );
};
