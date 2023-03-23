import classNames from 'classnames';

export const Badge = ({ children, status }) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800 capitalize',
        {
          'bg-red-100 text-red-800': status === 'declined',
          'bg-green-100 text-green-800': status === 'approved',
          'bg-blue-100 text-blue-800': status === 'in progress',
          'bg-yellow-100 text-yellow-800': status === 'awaiting verification',
          'bg-gray-200 text-gray-800': status === 'pending'
        }
      )}
    >
      {children}
    </span>
  );
};
