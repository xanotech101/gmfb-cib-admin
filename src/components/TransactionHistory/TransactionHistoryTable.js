import { useState } from 'react';
import { ArrowDownCircleIcon } from '@heroicons/react/20/solid';
import { Badge } from 'components/Badge/Badge';
import { ReceiptModal } from 'components/TransactionHistory/ReceiptModal';
import { naira } from 'utils/currencyFormatter';
import { formatDate } from 'utils';

export const TransactionHistoryTable = ({ transactions }) => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div role="list" className="divide-y divide-gray-200">
        <div className="relative lg:overflow-hidden overflow-x-scroll mt-6">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs bg-gray-100 uppercase border text-black">
              <tr>
                <th scope="col" className="p-3">
                  S/N
                </th>
                <th scope="col" className="p-3">
                  Id
                </th>
                <th scope="col" className="p-3">
                  Amount
                </th>
                <th scope="col" className="p-3">
                  Reference
                </th>
                <th scope="col" className="p-3">
                  Date
                </th>
                <th scope="col" className="p-3">
                  Balance
                </th>
                <th scope="col" className="p-3">
                  Type
                </th>
                <th scope="col" className="p-3">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction, i) => (
                <tr key={transaction?.Id} className="border hover:bg-gray-50">
                  <td className="whitespace-nowrap p-3 border">{i + 1}</td>
                  <td className="whitespace-nowrap p-3 border capitalize">{transaction?.Id}</td>
                  <td className="whitespace-nowrap p-3 border capitalize">
                    {transaction?.Amount && naira.format(transaction?.Amount / 100)}
                  </td>
                  <td className="whitespace-nowrap p-3 border capitalize">
                    {transaction?.ReferenceID}
                  </td>
                  <td className="whitespace-nowrap p-3 border capitalize">
                    {transaction?.CurrentDate && formatDate(transaction?.CurrentDate)}
                  </td>
                  <td className="whitespace-nowrap p-3 border capitalize">
                    {transaction?.Balance && naira.format(transaction?.Balance / 100)}
                  </td>
                  <td className="whitespace-nowrap p-3 border capitalize">
                    <Badge status={transaction?.RecordType === 'Credit' ? 'approved' : 'declined'}>
                      {transaction?.RecordType}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap p-3 border capitalize">
                    <button
                      onClick={() => {
                        setReceiptData(transaction);
                        setShowReceiptModal(true);
                        setCurrentIndex(i);
                      }}>
                      <ArrowDownCircleIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReceiptModal
        isOpen={showReceiptModal}
        setIsOpen={setShowReceiptModal}
        invoiceInfo={receiptData}
        showNextReceiptButton={transactions.length > 1}
        nextReceipt={() => {
          if (currentIndex < transactions.length - 1) {
            setReceiptData(transactions[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
          } else {
            setReceiptData(transactions[0]);
            setCurrentIndex(0);
          }
        }}
      />
    </>
  );
};
