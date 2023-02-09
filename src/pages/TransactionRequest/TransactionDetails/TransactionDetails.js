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
      <div className="grid grid-cols-12 gap-8 px-8 mt-8">
        <div className="col-span-12 flex justify-between items-center">
          <div>
            <SubHeading>TransactionRequest Details</SubHeading>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
          </div>
          <div className="flex space-x-2">
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
        <div className="col-span-4">
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
