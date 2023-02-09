import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feeds } from 'components/Common/Feeds';
import { RequestModal } from 'pages/Client/Dashboard/Request/ViewRequest/ViewRequest';
const people = [
  {
    name: 'Leonard Krasner',
    address: '54 shaki surulere',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Floyd Miles',
    address: '54 shaki surulere',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Selman',
    address: '54 shaki surulere',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Kristin Watson',
    address: '54 shaki surulere',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const AdminRequest = () => {
  const [requestModal, setRequestModal] = useState(false);
  return (
    <>
      <h1 className="font-medium text-xl pb-3">Corperate Accounts</h1>
      <div className="gray pl-4 mt-2">
        <div className="mt-6 flow-root p-6">
          <ul role="list" className="-my-5  divide-y divide-gray-200">
            {people.map((person) => (
              <li key={person.handle} className="py-4">
                <div className="flex flex-col items-center sm:flex-col md:flex-col lg:flex-row ">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                  </div>
                  <div className="min-w-0 flex-1  mt-3 md:mt-3 sm:mt-3 lg:mt-0 ml-2">
                    <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="truncate text-sm font-medium text-gray-900 mt-1">
                      {person.address}
                    </p>
                  </div>
                  <div>
                    <span
                      className="inline-flex text-center items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 mr-4 cursor-pointer mt-4"
                      onClick={() => {
                        setRequestModal(true);
                      }}>
                      View
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 p-6">
          <Link
            to="/transactionrequest"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            View all
          </Link>
        </div>
        <RequestModal
          open={requestModal}
          setOpen={() => {
            setRequestModal(false);
          }}>
          <div className="grid modal-grid  gap-4 mt-4">
            <div className="pl-3">
              <div className="mt-3">
                <h1 className="truncate text-sm capitalize font-medium text-gray-900">
                  Corperate Name
                </h1>
                <p className="text-sm font-medium text-gray-500 mt-1 mb-3">folakemi josh</p>
              </div>
              <div>
                <h1 className="truncate text-sm capitalize font-medium text-gray-900">Amount</h1>
                <p className="text-sm font-medium text-gray-500 mt-1 mb-3">$5000000</p>
                <hr></hr>
              </div>
              <div className="mt-5">
                <h1 className="truncate text-md capitalize font-medium text-gray-900 my-3">
                  Bank Information
                </h1>
              </div>
              <div>
                <h1 className="truncate text-sm capitalize font-medium text-gray-900">Bank name</h1>
                <p className="text-sm text-gray-500 mt-1 font-medium">Access Bank</p>
              </div>
              <div className="mt-2">
                <h1 className="truncate text-sm capitalize font-medium text-gray-900">
                  Account number
                </h1>
                <p className="text-sm text-gray-500 mt-1 mb-2 font-medium">0827850666</p>
                <hr></hr>
              </div>
            </div>
            <div>
              <Feeds />
            </div>
          </div>
        </RequestModal>
      </div>
    </>
  );
};
