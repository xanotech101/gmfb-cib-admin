import { Badge } from 'components/Badge/Badge';
import { naira } from 'utils/currencyFormatter';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

export const TransferRequestsTable = ({ transactions, initialSerialNumber }) => {
  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="relative lg:overflow-hidden overflow-x-scroll mt-6">
        <table className="w-full text-left text-sm text-gray-900">
          <thead className="text-xs bg-gray-100 uppercase border text-black">
            <tr>
              <th scope="col" className="p-3">
                S/N
              </th>
              <th scope="col" className="p-3">
                Account
              </th>
              <th scope="col" className="p-3">
                Amount
              </th>
              <th scope="col" className="p-3">
                Reference
              </th>
              <th scope="col" className="p-3">
                Beneficiary
              </th>
              <th scope="col" className="p-3">
                Date
              </th>
              <th scope="col" className="p-3">
                Approval Status
              </th>

              <th scope="col" className="p-3">
                Transfer Status
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {transactions.map((transaction, i) => (
              <tr key={transaction?._id}>
                <td className="whitespace-nowrap p-3 text-sm text-gray-500 border">
                  {initialSerialNumber + i}
                </td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-500 border">
                  <div className="text-gray-900 font-bold">
                    {transaction?.organization?.accountName}
                  </div>
                  <div>{transaction?.payerAccountNumber}</div>
                </td>
                <td className=" p-3 text-sm border text-gray-900 font-bold">
                  {naira.format(transaction?.amount)}
                </td>
                <td className=" p-3 text-sm text-gray-500 border">
                  {transaction?.transactionReference}
                </td>
                <td className=" p-3 text-sm text-gray-500 border">
                  <div>{transaction?.beneficiaryBankName}</div>
                  <div>{transaction?.beneficiaryAccountNumber}</div>
                  <div>{transaction?.beneficiaryAccountName}</div>
                </td>
                <td className=" p-3 text-sm text-gray-500 border">
                  {transaction?.createdAt && formatDate(transaction?.createdAt)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm text-gray-500 border">
                  <Badge status={transaction?.status}>{transaction?.status}</Badge>
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-500 border">
                  <Badge status={transaction?.transferStatus}>{transaction?.transferStatus}</Badge>
                </td>

                <td className="relative whitespace-nowrap p-4 text-sm font-medium border">
                  <Link
                    to={`/transfer-requests/${encodeURIComponent(transaction._id)}`}
                    className="text-primary hover:text-indigo-900">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
