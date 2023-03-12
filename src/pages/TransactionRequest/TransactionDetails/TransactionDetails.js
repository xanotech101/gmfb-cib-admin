import { useQuery } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Container } from 'components/Container/Container';
import { useModal, useStore } from 'hooks';
import { useParams } from 'react-router-dom';
import { transactionService } from 'services';
import { DeclineTransactionForm } from './DeclineTransactionForm';
import { TransactionDetailsList } from './TransactionDetailsList';
import { TransactionTimeLime } from './TransactionTimeline';

export const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = useStore();
  const { showModal, Modal } = useModal();
  const { data } = useQuery({
    queryKey: ['transaction-requests', id],
    queryFn: () => transactionService.getTransactionById(id),
    enabled: !!id
  });

  const handleShowDeclineButton = () => {
    if (data?.isApproved === 'active') {
      if (data?.declineResponse?.some(({ authorizerID }) => authorizerID === user?._id)) {
        return false;
      }
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="lg:grid md:block sm:block block grid-cols-12 gap-5 px-8 py-6 pb-6">
        <div className="col-span-12 flex justify-between items-center">
          <div className='mb-4'>
            <SubHeading>Transfer Request Details</SubHeading>
          </div>
          <div className="flex space-x-2 mb-4">
            <Button variant="success">Approve</Button>
            {handleShowDeclineButton() && (
              <Button variant="danger" onClick={showModal}>
                Decline
              </Button>
            )}
          </div>
        </div>
        <div className="col-span-8">
          <Container>
            <TransactionDetailsList details={data} />
          </Container>
        </div>
        <div className="col-span-4 mt-5 sm:mt-5 md:mt-5 lg:mt-0">
          <Container>
            <TransactionTimeLime
              authorizers={data?.authorizerID ?? []}
              declineResponse={data?.declineResponse ?? []}
            />
          </Container>
        </div>
      </div>
      {Modal({
        children: <DeclineTransactionForm callback={showModal} />,
        size: 'lg'
      })}
    </>
  );
};
