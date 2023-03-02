import { BanknotesIcon } from '@heroicons/react/20/solid';
export default function BalanceCard() {
  return (
    <div className="pb-1 ">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Grooming Centre</h3>

      <div className="overflow-hidden rounded-lg bg-white shadow mt-5">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BanknotesIcon className="h-7 w-7 grooming-text" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-md font-medium text-gray-500">Account Balance</dt>
                <dd>
                  <p className="text-2xl font-semibold text-gray-900 tracking-tight flex items-center">
                    <span>
                      <img src="https://cdn-icons-png.flaticon.com/512/32/32974.png" width="24px" />
                    </span>
                    32,456
                  </p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-md">
            <a href="#2" className="font-medium grooming-text">
              View more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
