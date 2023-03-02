import { Link } from 'react-router-dom';
import React from 'react';
import { Badge } from 'components/Badge/Badge';
import { Container } from 'components/Container/Container';
const people = [
  {
    id: 1,
    name: 'Leonard Krasner',
    amount: '12000',
    bankName: 'Guaranty Trust Bank',
    accountName: 'perfection chizuruoke',
    accountNumber: '0827850666',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Floyd Miles',
    amount: '12000',
    bankName: 'Guaranty Trust Bank',
    accountName: 'perfection chizuruoke',
    accountNumber: '0827850666',
    status: 'approved'
  },
  {
    id: 3,
    name: 'Emily Selman',
    amount: '12000',
    bankName: 'Guaranty Trust Bank',
    accountName: 'perfection chizuruoke',
    accountNumber: '0827850666',
    status: 'awaiting verification'
  },
  {
    id: 4,
    name: 'Kristin Watson',
    amount: '12000',
    bankName: 'Guaranty Trust Bank',
    accountName: 'perfection chizuruoke',
    accountNumber: '0827850666',
    status: 'declined'
  }
];

export const Requests = () => {
  return (
    <div>
      <Container>
        <div className=" pb-3 flex gap-2 flex-col lg:flex-col md:flex-col sm:flex-col justify-between">
          <h1 className="font-medium text-xl">Recent Transaction Requests</h1>
          <p>
            <Link to="/" className="text-indigo-500 mr-4 font-medium">
              View All
            </Link>
          </p>
        </div>
        <div className="relative overflow-x-auto mt-3">
          <table className=" divide-y divide-gray-300 w-400 ">
            <thead className="text-xs bg-gray-100  uppercase border text-black">
              <tr>
                <th scope="col" className="px-3 py-3.5">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-center">
              {people.map((person) => (
                <tr key={person?.id}>
                  <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500 border">
                    {person?.name}
                  </td>
                  <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500 border">
                    <Badge status={person?.status}>{person?.status}</Badge>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 border">
                    <Link
                      to={`/transaction-requests/${encodeURIComponent(person._id)}`}
                      className="text-primary hover:text-indigo-900 mr-3">
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
