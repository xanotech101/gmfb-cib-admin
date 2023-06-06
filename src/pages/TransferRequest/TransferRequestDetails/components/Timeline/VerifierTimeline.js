import { CheckIcon, UserIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';
import { Disclosure } from '@headlessui/react';
import { Container } from 'components/Container/Container';

export const VerifierTimeline = ({ verifiers, decisions }) => {
  const verifierResponse = (userId) => {
    const response = decisions.find(({ verifierID }) => {
      return verifierID === userId;
    });
    return response;
  };

  const icons = {
    verified: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    rejected: <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    pending: <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
  };

  return verifiers?.length > 0 ? (
    <Disclosure as="div" className="bg-white rounded-[8px] border border-[#dadce0] p-6" defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full text-left flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Verifiers</h2>
            <ChevronRightIcon className={open ? 'rotate-90 transform h-6 w-6' : 'h-6 w-6'} />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 w-full mt-3.5">
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {verifiers?.map((verifier, idx) => (
                  <li key={verifier._id}>
                    <div className="relative pb-8">
                      {idx !== verifiers.length - 1 ? (
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
                                'bg-gray-500': !verifierResponse(verifier._id),
                                'bg-red-500': verifierResponse(verifier._id)?.status === 'rejected',
                                'bg-green-500':
                                  verifierResponse(verifier._id)?.status === 'verified'
                              }
                            )}>
                            {icons[verifierResponse(verifier._id)?.status ?? 'pending']}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <div className="text-base text-gray-800 font-semibold -mt-1">
                              {verifier?.firstName ?? ''} {verifier?.lastName ?? ''}
                              <p className="text-gray-500 mt-0.5 text-sm">
                                {verifierResponse(verifier._id)?.reason ?? ''}
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ) : (
    <Container />
  );
};
