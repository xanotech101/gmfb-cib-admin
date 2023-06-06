import classNames from 'classnames';

export const Badge = ({ children, status = 'approved' }) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize border',
        {
          'bg-red-100 text-red-800 border-red-600': ['declined', 'failed'].includes(status),
          'bg-green-100 text-green-800 border-green-600': [
            'approved',
            'initiation',
            'authorisation',
            'authentication',
            'successful'
          ].includes(status),
          'bg-blue-100 text-blue-800 border-blue-600': status === 'in progress',
          'bg-yellow-100 text-yellow-800 border border-yellow-600': [
            'awaiting verification',
            'disburse pending'
          ].includes(status),
          'bg-gray-200 text-gray-800 border-gray-600': status === 'pending'
        },
        { 'bg-green-200': status === 'enabled' },
        { 'bg-red-200': status === 'disabled' }
      )}>
      {children}
    </span>
  );
};
