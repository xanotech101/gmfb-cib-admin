import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Input } from '../Input/Input';

const SearchFilter = ({ placeholder }) => {
  return (
    <div className="relative">
      <Input placeholder={placeholder} />
      <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 right-3 text-gray-500" />
    </div>
  );
};

export default SearchFilter;
