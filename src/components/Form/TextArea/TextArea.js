import { forwardRef } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export const TextArea = forwardRef((props, ref) => {
  const { id, placeholder, onChange, error } = props;
  return (
    <>
      <textarea
        name={id}
        id={id}
        cols="30"
        rows="10"
        ref={ref}
        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <ErrorMessage msg={error} />}
    </>
  );
});

TextArea.displayName = 'TextArea';
