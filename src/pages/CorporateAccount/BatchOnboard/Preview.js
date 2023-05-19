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
                  FIRST NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  LAST NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  USEREMAIL{' '}
                </th>
                <th scope="col" className="px-6 py-3">
                  PHONE NUMBER
                </th>
                <th scope="col" className="px-6 py-3">
                  GENDER
                </th>
                <th scope="col" className="px-6 py-3">
                  IMAGE URL
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
                  <td className="px-6 py-4 border-l">{value['FIRST NAME']}</td>
                  <td className="px-6 py-4 border-l">{value['LAST NAME']}</td>
                  <td className="px-6 py-4 border-l">{value['USER EMAIL']}</td>
                  <td className="px-6 py-4 border-l">{value['PHONE NUMBER']}</td>
                  <td className="px-6 py-4 border-l">{value['GENDER']}</td>
                  <td className="px-6 py-4 border-l">{value['IMAGE URL']}</td>
                  <td className="px-6 py-4 border-l">{value['ACCOUNT NUMBER']}</td>
                  <td className="px-6 py-4 border-l">{value['ACCOUNT NAME']}</td>
                  <td className="px-6 py-4 border-l">{value['CUSTOMER ID']}</td>
                  <td className="px-6 py-4 border-l">{value['ACCOUNT EMAIL']}</td>
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
