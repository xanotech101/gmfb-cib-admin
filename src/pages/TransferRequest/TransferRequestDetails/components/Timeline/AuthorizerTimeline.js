import { CheckIcon, UserIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Container } from 'components/Container/Container';
import classnames from 'classnames';

export const AuthorizerTimeline = ({ authorizer, decision }) => {
  const icons = {
    approved: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    declined: <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    pending: <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
  };

  return (
    <Container>
      <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
        Authorizer
      </h2>
      <div className="flow-root mt-6">
        <ul role="list" className="-mb-8">
          <li>
            <div className="relative pb-8">
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classnames(
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                      {
                        'bg-gray-500': !decision?.status,
                        'bg-red-500': decision?.status === 'declined',
                        'bg-green-500': decision?.status === 'approved'
                      }
                    )}>
                    {icons[decision?.status ?? 'pending']}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <div className="text-base text-gray-800 font-semibold -mt-1">
                      {authorizer?.firstName ?? ''} {authorizer?.lastName ?? ''}
                      <p className="text-gray-500 mt-0.5 text-sm">{decision?.reason ?? ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
};
