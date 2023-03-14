import { CheckIcon, UserIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';
import { Container } from 'components/Container/Container';

export const TransactionTimeLime = ({ authorizers, decisions }) => {
  const authorizerResponse = (userId) => {
    const response = decisions.find(({ authoriserID }) => {
      return authoriserID === userId;
    });
    return response;
  };

  const icons = {
    authorised: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    rejected: <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    pending: <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
  };

  return (
    <Container>
      <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
        Authorizers
      </h2>
      <div className="flow-root mt-6">
        <ul role="list" className="-mb-8">
          {authorizers.map((authorizer, idx) => (
            <li key={authorizer._id}>
              <div className="relative pb-8">
                {idx !== authorizers.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classnames(
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                        {
                          'bg-gray-500': !authorizerResponse(authorizer._id),
                          'bg-red-500': authorizerResponse(authorizer._id)?.status === 'rejected',
                          'bg-green-500':
                            authorizerResponse(authorizer._id)?.status === 'authorised'
                        }
                      )}
                    >
                      {icons[authorizerResponse(authorizer._id)?.status ?? 'pending']}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <div className="text-base text-gray-800 font-semibold -mt-1">
                        {authorizer?.firstName ?? ''} {authorizer?.lastName ?? ''}
                        <p className="text-gray-500 mt-0.5 text-sm">
                          {authorizerResponse(authorizer._id)?.reason ?? ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};
