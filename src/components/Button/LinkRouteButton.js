import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Link } from 'react-router-dom';

export const LinkButton = ({ to, children }) => {
  return (
    <>
      <Link
        to={to}
        className="sm:hidden lg:block md:block hidden absolute right-9  top-30   text-center items-center rounded border border-gray-300 bg-white grooming-color2 hover:text-white -md text-black font-medium  leading-5 text-gray-700 shadow-sm  mr-4 cursor-pointer mt-4 pr-2">
        <p className="p-3 flex items-center gap-1">
          <ArrowLeftIcon className="w-6 h-6" />
          {children}
        </p>
      </Link>
    </>
  );
};
