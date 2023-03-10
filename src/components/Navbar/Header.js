import React from 'react';
import { BuildingOfficeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useStore } from 'hooks';

export default function Header({ children, title }) {
  const { user } = useStore();
  let greetingMsg 
  const greeting = () => {
    const date = new Date();
    const hour = +date.getHours();

   
   greetingMsg = 'Good Evening';

    if (hour < 12) {
      greetingMsg = 'Good Morning';
    }

    if (hour >= 12 && hour < 17) {
      greetingMsg = 'Good Afternoon';
    }

    return greetingMsg;
  };

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 -mt-2">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <div>
                <img
                  className="hidden h-16 w-16 rounded-full sm:block object-cover"
                  src="https://images.unsplash.com/photo-1587064712555-6e206484699b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJsYWNrJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
              </div>
              <div>
                <div className="flex items-center">
                  <div>
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      alt=""
                    />
                  </div>
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                    {greeting()}, {user?.firstName}
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                    <BuildingOfficeIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    {title}
                  </dd>
                  <dt className="sr-only">Account status</dt>
                  <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    <CheckCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 grooming-text text-lg"
                      aria-hidden="true"
                    />
                    Verified account
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
