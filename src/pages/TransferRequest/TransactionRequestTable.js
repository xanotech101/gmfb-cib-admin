import { Badge } from 'components/Badge/Badge';
import { naira } from 'utils/currencyFormatter';
import { Link } from 'react-router-dom';

export const TransactionRequestTable = ({ transactions, sentToBankOne }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    S/N
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Originating Account
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Transaction Reference
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Beneficiary
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Approval Status
                  </th>
                  {sentToBankOne && (
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Transfer Status
                    </th>
                  )}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {transactions.map((transaction, i) => (
                  <tr key={transaction?._id}>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{i + 1}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {transaction?.payerAccountNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {naira.format(transaction?.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {transaction?.transactionReference}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div>{transaction?.beneficiaryBankName}</div>
                      <div>{transaction?.beneficiaryAccountName}</div>
                      <div>{transaction?.beneficiaryAccountNumber}</div>
                    </td>
                    {sentToBankOne ? (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Badge status={transaction?.transferStatus}>
                          {transaction?.transferStatus}
                        </Badge>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Badge status={transaction?.status}>{transaction?.status}</Badge>
                      </td>
                    )}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        to={`/transfers/${encodeURIComponent(transaction._id)}`}
                        className="text-primary hover:text-indigo-900 ml-4">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
