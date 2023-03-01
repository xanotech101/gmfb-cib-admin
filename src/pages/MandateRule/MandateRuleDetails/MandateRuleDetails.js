import { Avatar } from 'components/Avatar/Avatar';

export const MandateDetails = ({ mandate }) => {
  return (
    <div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Mandate Information</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{mandate?.name}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Min Amount</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {mandate?.minAmount}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Max Amount</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {mandate?.maxAmount}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Authorizers</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-1">
                {mandate?.authorisers?.map((authorizer) => (
                  <div
                    key={authorizer}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="flex-shrink-0">
                      <Avatar
                        bgColor="bg-pink-500"
                        name={`${authorizer.firstName} ${authorizer.lastName}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {authorizer?.firstName} {authorizer?.lastName}
                        </p>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </dd>
          </div>
        </dl>
        <div className="pb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Verifier</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400">
                <div className="flex-shrink-0">
                  <Avatar name={`${mandate.verifier?.firstName} ${mandate.verifier?.lastName}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {mandate.verifier?.firstName} {mandate.verifier?.lastName}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </dd>
        </div>
      </div>
    </div>
  );
};
