import Pagination from 'components/Pagination/Pagination';
import { useState } from 'react';
const postPerPage = 10;

// 0068001101004223

const DuplicateAccounts = ({ items }) => {
  const [page, setPage] = useState(1);
  const currentPage = items.slice(page * postPerPage - postPerPage, page * postPerPage);

  return items.length > 0 ? (
    <div className="mt-16">
      <h2 className="text-2xl font-bold">Duplicate Accounts</h2>
      <div className="relative overflow-x-auto mt-6">
        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm bg-gray-100 border text-black uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Bank Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Error Message
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPage.map((value, index) => (
                <tr className="border" key={index}>
                  <td className="px-6 py-4 border-l">{value.amount}</td>
                  <td className="px-6 py-4 border-l">{value.bankName}</td>
                  <td className="px-6 py-4 border-l">{value.bankCode}</td>
                  <td className="px-6 py-4 border-l">{value.accountType}</td>
                  <td className="px-6 py-4 border-l">{value.accountNumber}</td>
                  <td className="px-6 py-4 border-l text-red-500">{value.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalItems={items.length}
        itemsPerPage={postPerPage}
        handlePageClick={setPage}
        currentPage={page}
      />
    </div>
  ) : null;
};

const DuplicateUsers = ({ items }) => {
  const [page, setPage] = useState(1);
  const currentPage = items.slice(page * postPerPage - postPerPage, page * postPerPage);

  return items.length > 0 ? (
    <div className="mt-16">
      <h2 className="text-2xl font-bold">Invalid Accounts</h2>
      <div className="relative overflow-x-auto mt-6">
        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm bg-gray-100 border text-black uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Account Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Error Message
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPage.map((value, index) => (
                <tr className="border" key={index}>
                  <td className="px-6 py-4 border-l">{value.account?.accountName}</td>
                  <td className="px-6 py-4 border-l">{value.account?.accountNumber?.[0]}</td>
                  <td className="px-6 py-4 border-l">{value.account?.email}</td>
                  <td className="px-6 py-4 border-l text-red-500">{value.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalItems={items.length}
        itemsPerPage={postPerPage}
        handlePageClick={setPage}
        currentPage={page}
      />
    </div>
  ) : null;
};

const InvalidAccounts = ({ items }) => {
  const [page, setPage] = useState(1);
  const currentPage = items.slice(page * postPerPage - postPerPage, page * postPerPage);

  return items.length > 0 ? (
    <div className="mt-16">
      <h2 className="text-2xl font-bold">Invalid Accounts</h2>
      <div className="relative overflow-x-auto mt-6">
        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm bg-gray-100 border text-black uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Account Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Error Message
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPage.map((value, index) => (
                <tr className="border" key={index}>
                  <td className="px-6 py-4 border-l">{value.account?.accountName}</td>
                  <td className="px-6 py-4 border-l">{value.account?.accountNumber?.[0]}</td>
                  <td className="px-6 py-4 border-l">{value.account?.email}</td>
                  <td className="px-6 py-4 border-l text-red-500">{value.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalItems={items.length}
        itemsPerPage={postPerPage}
        handlePageClick={setPage}
        currentPage={page}
      />
    </div>
  ) : null;
};

export const Error = ({ duplicateAccounts, duplicateUsers, invalidAccounts }) => {
  return (
    <>
      <DuplicateAccounts items={duplicateAccounts} />
      <DuplicateUsers items={duplicateUsers} />
      <InvalidAccounts items={invalidAccounts} />
    </>
  );
};
