import { Link } from 'react-router-dom';
import React from 'react';
const people = [
  {
    id: 1,
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Floyd Miles',
    handle: 'floydmiles',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Emily Selman',
    handle: 'emilyselman',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'Kristin Watson',
    handle: 'kristinwatson',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const Requests = (props) => {
  const { header } = props;

  return (
    <>
      <h1 className="font-medium text-xl pb-3">{header}</h1>
      <div className=" pl-4 mt-2">
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {people.map((person) => (
              <li key={person.id} className="py-4">
                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row ">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                  </div>
                  <div className="min-w-0 flex-1 mt-3 md:mt-3 sm:mt-3 lg:mt-0 ml-2">
                    <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="truncate text-sm text-gray-500">{`@${person.handle}`}</p>
                  </div>
                  <div>
                    <Link
                      to="/transaction-requests/1"
                      className="inline-flex text-center items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 mr-4 cursor-pointer mt-4"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Link
            to="/transaction-requests"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            View all
          </Link>
        </div>
      </div>
      <div></div>
    </>
  );
};
