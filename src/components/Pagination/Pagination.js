import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import './Pagination.css';
import { PER_PAGE } from 'constants/pagination';

function Pagination({ itemsPerPage = PER_PAGE, totalItems, handlePageClick, currentPage }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return Number(totalItems) > Number(itemsPerPage) ? (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      onPageChange={({ selected }) => handlePageClick(selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="pagination__item"
      previousClassName="pagination__item-previous"
      nextClassName="pagination__item-next"
      breakClassName="pagination__item"
      activeClassName="active"
      forcePage={currentPage - 1}
    />
  ) : null;
}

export default Pagination;
