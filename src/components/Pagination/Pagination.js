import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const PER_PAGE = 5;

export const Pagination = ({ total, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  const isLastPage = pageNumbers[pageNumbers.length - 1] === currentPage;
  const isFirstPage = pageNumbers[0] === currentPage;
  const toShow = useMemo(() => {
    pageNumbers.slice(currentPage, 5);
  }, [currentPage, pageNumbers]);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
          <Link to="#" className="page-link" onClick={() => paginate(currentPage - 1)}>
            Previous
          </Link>
        </li>
        {toShow.map((number) => (
          <li key={number} className="page-item">
            <Link to="#" onClick={() => paginate(number)} className="page-link">
              {number}
            </Link>
          </li>
        ))}
        <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
          <Link to="#" className="page-link" onClick={() => paginate(currentPage + 1)}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
