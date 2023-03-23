import React from 'react';

export const Input=(prop)=> {
  const { type, id, title,onChange } = prop;
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          onChange={onChange}
        />
      </div>
    </>
  );
}


export const InputCheckbox = (prop) => {
  const { type, id, title } = prop;
  return (
    <>
         <input
              id={id}
              name={id}
              type={type}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
             {title}
            </label>
    </>
  )
}
