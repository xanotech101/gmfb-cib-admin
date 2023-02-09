import React from 'react';

export const Label = ({ id, label }) => {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
  );
};
