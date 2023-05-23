import Pagination from 'components/Pagination/Pagination';
import { useState } from 'react';

const postPerPage = 10;

export const Preview = ({ items }) => {
  const [page, setPage] = useState(1);
  const currentPage = items.slice(page * postPerPage - postPerPage, page * postPerPage);

  return (
    <>
      <div className="relative overflow-x-auto mt-6">
        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm bg-gray-100 border text-black uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ADMIN
                </th>
                <th scope="col" className="px-6 py-3">
                  ACCOUNT NUMBER
                </th>
                <th scope="col" className="px-6 py-3">
                  ACCOUNT NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  CUSTOMER ID
                </th>
                <th scope="col" className="px-6 py-3">
                  ACCOUNT EMAIL
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPage.map((value, index) => (
                <tr className="border" key={index}>
                  <td className="px-6 py-4 border-l">
                    <div>
                      {value['ADMIN_FIRSTNAME']} {value['ADMIN_LASTNAME']}
                    </div>
                    <div>{value['ADMIN_EMAIL']}</div>
                    <div>{value['ADMIN_PHONE_NUMBER']}</div>
                  </td>
                  <td className="px-6 py-4 border-l">{value['ACCOUNT_NUMBER']}</td>
                  <td className="px-6 py-4 border-l">{value['ACCOUNT_NAME']}</td>
                  <td className="px-6 py-4 border-l">{value['CUSTOMER_ID']}</td>
                  <td className="px-6 py-4 border-l">{value['ACCOUNT_EMAIL']}</td>
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
    </>
  );
};
