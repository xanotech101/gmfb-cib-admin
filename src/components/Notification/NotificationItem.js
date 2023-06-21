import { InboxIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useNotifications } from 'hooks';
import { formatDate } from 'utils';

export const NotificationItem = ({ notification, onDelete }) => {
  const { markNotificationsAsRead } = useNotifications();

  const getPageUrl = () => {
    switch (notification.type) {
      case 'transaction':
        return `/transfer-requests/${encodeURI(notification.identifier)}`;
      case 'ticket':
        return `/requests/${encodeURI(notification.identifier)}`;
      default:
        return '/';
    }
  };
  return (
    <div
      className={classnames(
        'pointer-events-auto w-full overflow-hidden px-4 sm:px-6 z-10 py-8 hover:bg-gray-50',
        { 'opacity-60': notification.read }
      )}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-base font-medium text-gray-900">{notification.title}</p>
          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
          <div className="flex mt-3 space-x-5 items-center">
            <Link
              to={getPageUrl()}
              onClick={() => markNotificationsAsRead([notification._id])}
              className="text-primary text-xs underline"
              target="_blank">
              View request
            </Link>
            <span className="text-xs text-gray-500">
              {notification?.createdAt && formatDate(notification.createdAt)}
            </span>
          </div>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            onClick={() => onDelete(notification._id)}
            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="sr-only">Close</span>
            <TrashIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
