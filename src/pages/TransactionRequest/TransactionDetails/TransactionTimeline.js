import { CheckIcon } from '@heroicons/react/20/solid';
import classnames from 'classnames';

export const TransactionTimeLime = ({ authorizers, declineResponse }) => {
  const authorizerResponse = (userId) => {
    const response = declineResponse.find(({ authorizerID }) => {
      return authorizerID === userId;
    });
    return response?.reason ?? null;
  };

  return (
    <div className="flow-root">
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
              <div className="relative flex space-x-3 items-start">
                <div>
                  <span
                    className={classnames(
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                      {
                        'bg-gray-500': !authorizerResponse(authorizer._id),
                        'bg-red-500': authorizerResponse(authorizer._id)
                      }
                    )}
                  >
                    <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-semibold">
                    {authorizer?.firstName ?? ''} {authorizer?.lastName ?? ''}
                  </p>
                  <p className="text-sm text-gray-700">
                    {authorizerResponse(authorizer._id) ?? ''}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
