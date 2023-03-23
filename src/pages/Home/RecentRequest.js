import { Link } from 'react-router-dom';
import React from 'react';
import { Badge } from 'components/Badge/Badge';
import { Container } from 'components/Container/Container';
import { Button } from 'components/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { transactionService } from 'services';

export const Requests = () => {
  const { data } = useQuery({
    queryKey: ['recent-transaction-requests'],
    queryFn: () =>
      transactionService.getTransactionPerOrganization({
        perPage: 5
      })
  });

  return (
    <div className='mb-5'>
      <Container>
        <div className=" pb-3 flex justify-between items-center">
          <h1 className="font-medium text-xl mb-0">Recent Transaction Requests</h1>
          <Link to="/transaction-requests/all" className="text-indigo-500 font-medium">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="relative overflow-x-auto mt-3">
          <table className=" divide-y divide-gray-300 w-full">
            <thead className="text-xs bg-gray-100  uppercase border text-black text-left">
              <tr>
                <th scope="col" className="px-4 py-3.5">
                  Customer Name
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Beneficiary Bank
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Beneficiary Account Name
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data?.requests?.map((request) => (
                <tr key={request?._id}>
                  <td className="whitespace-nowrap py-4 text-sm text-gray-500 border px-4">
                    {request?.customerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 border">
                    {request?.amount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 border">
                    {request?.beneficiaryBankName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 border">
                    {request?.beneficiaryAccountName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 border">
                    <Badge status={request?.status}>{request?.status}</Badge>
                  </td>
                  <td className="relative whitespace-nowrap py-4 px-4 text-sm font-medium border">
                    <Link
                      to={`/transaction-requests/${encodeURIComponent(request?._id)}`}
                      className="text-primary hover:text-indigo-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};
