import { useQuery } from '@tanstack/react-query';
import { SubHeading } from 'components/Header/SubHeading';
import { Container } from 'components/Container/Container';
import { useParams } from 'react-router-dom';
import { transactionService } from 'services';
import { TransactionDetailsList } from './components/TransactionDetailsList';
import { VerifierTimeline } from './components/Timeline/VerifierTimeline';
import { AuthorizerTimeline } from './components/Timeline/AuthorizerTimeline';

export const TransferRequestDetails = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['transaction-requests', id],
    queryFn: () => transactionService.getTransactionById(id),
    enabled: !!id
  });

  return (
    <div className="lg:grid md:block sm:block block grid-cols-12 gap-5 px-8 mt-8 pb-6">
      <div className="col-span-12 flex justify-between items-center">
        <div>
          <SubHeading>Transfer Details</SubHeading>
        </div>
      </div>
      <div className="col-span-8">
        <Container>
          <TransactionDetailsList details={data} />
        </Container>
      </div>
      <div className="col-span-4 space-y-6">
        <VerifierTimeline
          verifiers={data?.mandate?.verifiers ?? []}
          decisions={data?.verifiersAction ?? []}
        />
        <AuthorizerTimeline
          authorizer={data?.mandate?.authoriser ?? {}}
          decision={data?.authoriserAction ?? {}}
        />
      </div>
    </div>
  );
};
