import { InboxIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/20/solid';

export const NotificationItem = () => {
  return (
    <div className="pointer-events-auto w-full overflow-hidden px-4 sm:px-6 z-10 pt-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">Discussion moved</p>
          <p className="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.
          </p>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Close</span>
            <TrashIcon className="h-5 w-5 grooming-text" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
