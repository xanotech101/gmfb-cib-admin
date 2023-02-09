import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ msg }) => {
  return (
    <small className="text-sm text-red-600 flex items-center mt-0 absolute">
      <ExclamationCircleIcon className="h-4 w-4 fill-transparent mt-0.5 mr-1" />
      {msg}
    </small>
  );
};

export default ErrorMessage;
