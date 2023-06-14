import classNames from 'classnames';

export const Badge = ({ children, status = 'approved' }) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize border',
        {
          'bg-red-100 text-red-500 border-red-400': ['declined', 'failed', 'disabled'].includes(
            status
          ),
          'bg-green-100 text-green-500 border-green-400': [
            'approved',
            'initiation',
            'authorisation',
            'authentication',
            'successful',
            'active'
          ].includes(status),
          'bg-blue-100 text-blue-500 border-blue-400': status === 'in progress',
          'bg-yellow-100 text-yellow-500 border border-yellow-400': [
            'awaiting verification',
            'disburse pending',
            'queued'
          ].includes(status),
          'bg-gray-100 text-gray-500 border-gray-400': status === 'pending'
        }
      )}>
      {children}
    </span>
  );
};
