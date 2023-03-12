import { useMemo, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from 'components/Button/Button';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Container } from 'components/Container/Container';
import { useModal, useStore } from 'hooks';
import { useParams } from 'react-router-dom';
import { transactionService } from 'services';
import { TransactionDetailsList } from './components/TransactionDetailsList';
import { TransactionTimeLime } from './components/Timeline/AuthorizerTimeline';
import { FeedbackForm } from './components/FeedbackForm';
import { VerifierTimeline } from './components/Timeline/VerifierTimeline';

export const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = useStore();
  const queryClient = useQueryClient();
  const { showModal, Modal } = useModal();
  const [actionType, setActionType] = useState(null);

  const { data } = useQuery({
    queryKey: ['transaction-requests', id],
    queryFn: () => transactionService.getTransactionById(id),
    enabled: !!id
  });

  const canUserAuthorize = useMemo(() => {
    if (data?.status !== 'pending') {
      return false;
    }

    const authorizers = data.mandate?.authorisers ?? [];

    const isAuthorizer = authorizers.some(({ _id }) => _id === user?._id);

    if (!isAuthorizer) {
      return false;
    }

    const hasDeclined = data?.authorisersAction?.some(
      ({ authoriserID }) => authoriserID === user?._id
    );

    return !hasDeclined;
  }, [data, user]);

  const canAuthorizerReAuthorize = useMemo(() => {
    const statuses = ['awaiting verification', 'in progress'];
    if (!statuses.includes(data?.status)) {
      return false;
    }

    const hasUserRejected = data?.authorisersAction?.find(
      ({ authoriserID, status }) => authoriserID === user?._id && status === 'rejected'
    );

    return !!hasUserRejected;
  }, [data, user]);

  const canAuthorizerReDecline = useMemo(() => {
    const statuses = ['awaiting verification', 'in progress'];
    if (!statuses.includes(data?.status)) {
      return false;
    }

    const hasUserAuthorized = data?.authorisersAction?.find(
      ({ authoriserID, status }) => authoriserID === user?._id && status === 'authorised'
    );

    return !!hasUserAuthorized;
  }, [data, user]);

  const canUserVerify = useMemo(() => {
    if (data?.status !== 'awaiting verification') {
      return false;
    }

    const verifier = data.mandate?.verifier ?? null;

    return verifier?._id === user?._id;
  }, [data, user]);

  const authorizerApproveTransaction = useMutation({
    mutationFn: (payload) => transactionService.authorizerApproveRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transaction-requests', id],
        exact: true
      });
      showModal();
    }
  });

  const authorizerDeclineTransaction = useMutation({
    mutationFn: (payload) => transactionService.authorizerDeclineRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transaction-requests', id],
        exact: true
      });
      showModal();
    }
  });

  const verifierApproveTransaction = useMutation({
    mutationFn: (payload) => transactionService.verifierApproveTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transaction-requests', id],
        exact: true
      });
      showModal();
    }
  });

  const verifierDeclineTransaction = useMutation({
    mutationFn: (payload) => transactionService.verifierDeclineTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transaction-requests', id],
        exact: true
      });
      showModal();
    }
  });

  const showModalAndUpdateAction = (action) => {
    setActionType(action);
    showModal();
  };

  const takeAction = (payload) => {
    switch (actionType) {
      case 'authorizer-approve':
        authorizerApproveTransaction.mutate(payload);
        break;
      case 'authorizer-decline':
        authorizerDeclineTransaction.mutate(payload);
        break;
      case 'verifier-approve':
        verifierApproveTransaction.mutate(payload);
        break;
      case 'verifier-decline':
        verifierDeclineTransaction.mutate(payload);
        break;
      default:
        break;
    }
  };

  const getLoadingStatus = () => {
    return (
      authorizerApproveTransaction.isLoading ||
      authorizerDeclineTransaction.isLoading ||
      verifierApproveTransaction.isLoading ||
      verifierDeclineTransaction.isLoading
    );
  };

  const getModalTitle = () => {
    // get title from actionType
    switch (actionType) {
      case 'authorizer-approve':
        return 'Authorize Transaction';

      case 'authorizer-decline':
        return 'Decline Transaction';

      case 'verifier-approve':
        return 'Verify Transaction';

      case 'verifier-decline':
        return 'Decline Transaction';

      default:
        break;
    }
  };

  return (
    <>
      <div className="lg:grid md:block sm:block block grid-cols-12 gap-5 px-8 mt-8 pb-6">
        <div className="col-span-12 flex justify-between items-center">
          <div>
            <SubHeading>Transaction Request Details</SubHeading>
          </div>
          <div className="flex space-x-2">
            {canUserAuthorize && (
              <>
                <Button
                  variant="success"
                  disabled={getLoadingStatus()}
                  onClick={() => {
                    showModalAndUpdateAction('authorizer-approve');
                  }}
                >
                  Authorize
                </Button>
                <Button
                  variant="danger"
                  disabled={getLoadingStatus()}
                  onClick={() => {
                    showModalAndUpdateAction('authorizer-decline');
                  }}
                >
                  Decline
                </Button>
              </>
            )}

            {console.log(canAuthorizerReAuthorize)}

            {canAuthorizerReAuthorize && (
              <Button
                variant="success"
                disabled={getLoadingStatus()}
                onClick={() => {
                  showModalAndUpdateAction('authorizer-approve');
                }}
              >
                Change decision
              </Button>
            )}

            {canAuthorizerReDecline && (
              <Button
                variant="danger"
                disabled={getLoadingStatus()}
                onClick={() => {
                  showModalAndUpdateAction('authorizer-decline');
                }}
              >
                Change decision
              </Button>
            )}

            {canUserVerify && (
              <>
                <Button
                  variant="success"
                  disabled={getLoadingStatus()}
                  onClick={() => {
                    showModalAndUpdateAction('verifier-approve');
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  disabled={getLoadingStatus()}
                  onClick={() => {
                    showModalAndUpdateAction('verifier-decline');
                  }}
                >
                  Decline
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="col-span-8">
          <Container>
            <TransactionDetailsList details={data} />
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
      {Modal({
        children: (
          <FeedbackForm
            callback={takeAction}
            title={getModalTitle()}
            isSubmitting={getLoadingStatus()}
          />
        ),
        size: 'lg'
      })}
    </>
  );
};
