import React from 'react';
import { BuildingOfficeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useStore } from 'hooks';
import { Avatar } from 'components/Avatar/Avatar';
export default function Header({ children }) {
  const { user } = useStore();
  const name = `${user?.firstName} ${user?.lastName}`;
  const ID = user?._id;
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 -mt-2">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <div>
                <div className="flex items-center">
                  <div className="">
                    <Avatar name={name} size={64} textSize="20" />
                  </div>
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                    Hello, {user?.firstName}
                  </h1>
                </div>
                <dl className="pt-2 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap ">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                    <BuildingOfficeIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    SYSTEM ADMIN
                  </dd>
                  <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                    <UserCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    ID: {ID}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
