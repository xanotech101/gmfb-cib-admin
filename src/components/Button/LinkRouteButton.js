import React from 'react';
import { Link } from 'react-router-dom';

export const LinkButton = ({ to, children }) => {
  return (
    <>
      <Link to={to} className="absolute right-9 top-20 flex items-center">
        <button className="inline-flex text-center items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium grooming-text leading-5 text-gray-700 shadow-sm hover:bg-gray-50 mr-4 cursor-pointer mt-4">
          {children}
        </button>
      </Link>
    </>
  );
};
