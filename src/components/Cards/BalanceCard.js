import { ScaleIcon } from '@heroicons/react/24/outline';
export default function BalanceCard() {
  return (
    <div className="pb-4 h">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Grooming Centre</h3>

      <div className="overflow-hidden rounded-lg bg-white shadow mt-5">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ScaleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">Account Balance</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">$50000000</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="#2" className="font-medium grooming-text">
              View more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
