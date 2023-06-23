import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { Input } from '../Input/Input';

const SearchFilter = ({ placeholder, value, setValue, onSearch }) => {
  return (
    <div className="relative mt-4 w-full md:w-[300px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch?.();
        }}>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue?.(e.target.value)}
        />
        {value?.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setValue?.('');
              setTimeout(() => {
                onSearch?.();
              }, 1);
            }}>
            <XCircleIcon className="w-5 h-5 absolute top-3 right-9 text-gray-500" />
          </button>
        )}
        <button type="submit">
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 right-3 text-gray-500" />
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
