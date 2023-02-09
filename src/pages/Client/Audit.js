import React, { useState } from 'react';
import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon,AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { Input } from 'components/Form/Input/Input';
// This holds a list of some fiction people
// Some  have the same name but different age and id
const USERS = [
  {
    id: 1,
    name: 'Andy',
    age: 32,
    email: 'ricardo.cooper@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#'
  },
  {
    id: 2,
    name: 'Bob',
    age: 30,
    email: 'kristen.ramos@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#'
  },
  {
    id: 3,
    name: 'Tom Hulk',
    age: 40,
    email: 'kristen.ramos@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#'
  },
  {
    id: 4,
    name: 'Tom Hank',
    age: 50,
    email: 'kristen.ramos@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#'
  }
];

export const Audit = () => {
  // the value of the search field
  const [name, setName] = useState('');

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = USERS.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(USERS);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  return (
    <div className='py-5 pl-5 pr-4'>
    <Container>
      <Heading>Audit Trail</Heading>
     <div>
     <div className="mb-4">
        <div className='flex items-center font-medium'>
        <p>Filter recent activity</p>
      <AdjustmentsHorizontalIcon width="20px" className='ml-2'/>
     </div>
      <div className='w-80'>
      <Input type="search" value={name} onChange={filter} placeholder="Search for recent/new activities...." />
      </div>
     </div>
     </div>

      <div className="user-list">
        <ul role="list" className="divide-y divide-gray-200">
          {foundUsers && foundUsers.length > 0 ? (
            foundUsers.map((user) => (
              <li key={user.id} className="user">
                <a href={user.href} className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-sm font-medium text-indigo-600">
                            {user.name}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <EnvelopeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">{user.email}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on <time dateTime={user.dateFull}>{user.date}</time>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              {user.stage}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <h1>No results found!</h1>
          )}
        </ul>
      </div>
    </Container>
    </div>
  );
};
