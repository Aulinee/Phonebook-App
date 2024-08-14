import React from 'react';
import "./tablePagination.css";
import "../../style.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function TablePagination({ currentPage, totalPages, onPageChange }) {
  // Handle edge cases where totalPages or currentPage might be invalid
  if (totalPages <= 0 || currentPage <= 0) return null;

  // Disable previous and next buttons based on the current page and total pages
  const isPrevDisabled = currentPage === 1 || totalPages <= 1;
  const isNextDisabled = currentPage === totalPages || totalPages <= 1;

  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex">
        <li>
          <button
            className={`h-10 px-5 text-blue-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
            disabled={isPrevDisabled}
            onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
          >
            <ArrowBackIosNewIcon style={{ cursor: 'pointer', fontSize: 15, marginRight: 10 }} />
            Previous
          </button>
        </li>
        {[...Array(totalPages).keys()].map(page => (
          <li key={page + 1}>
            <button
              className={`h-10 px-5 transition-colors duration-150 ${currentPage === page + 1 ? 'text-white bg-blue-600' : 'text-blue-600 bg-white hover:bg-blue-100'} focus:shadow-outline`}
              onClick={() => onPageChange(page + 1)}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`h-10 px-5 text-blue-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'}`}
            disabled={isNextDisabled}
            onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          >
            Next
            <ArrowForwardIosIcon style={{ cursor: 'pointer', fontSize: 15, marginLeft: 10 }} />
          </button>
        </li>
      </ul>
    </nav>
  );
}