import classnames from 'classnames';
import CircleLoader from 'react-spinners/ClipLoader';

export const Button = (props) => {
  const {
    type = 'button',
    children,
    onClick,
    variant = 'primary',
    disabled,
    isFullWidth = false
  } = props;
  return (
    <button
      className={classnames(
        `flex justify-center rounded-md border border-transparent py-2 px-4 text-sm 
          font-medium shadow-sm 
          disabled:cursor-not-allowed`,
        {
          'bg-primary text-white disabled:opacity-50': variant === 'primary',
          'bg-gray text-black border-indigo border-2': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-500': variant === 'danger',
          'bg-green-600 text-white hover:bg-green-500': variant === 'success',
          'w-full': isFullWidth
        }
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {disabled ? <CircleLoader size={25} color={'#fff'} /> : children}
    </button>
  );
};

export const ModalButton = ({ onClick, ref, children, bg, ring }) => {
  return (
    <div>
      <button
        className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2 ${ring} ${bg} focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm ml-5`}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    </div>
  );
};
