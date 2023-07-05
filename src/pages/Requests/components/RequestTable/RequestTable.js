import { ClockIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

export const RequestTable = ({ tickets, initialSerialNumber }) => {
  return (
    <div className="lg:overflow-hidden overflow-x-scroll">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
        <thead className="text-xs bg-gray-100  uppercase border text-black">
          <tr>
            <th scope="col" className="p-3">
              S/N
            </th>
            <th scope="col" className="px-3">
              Action
            </th>
            <th scope="col" className="px-3">
              User
            </th>
            <th scope="col" className="px-3">
              Date Created
            </th>
            <th scope="col" className="px-3">
              <p className="sr-only">action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, i) => (
            <tr className="border  hover:bg-gray-50" key={ticket._id}>
              <td className="p-3 border-l">{initialSerialNumber + i}</td>
              <td className="p-3 border-l">{ticket.topic}</td>
              <td className="p-3 border-l">{`${ticket.createdBy?.firstName} ${ticket.createdBy?.lastName}`}</td>
              <td className="p-3 border-l">
                <p className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                  <ClockIcon className=" h-5 w-5 flex-shrink-0  text-primary" aria-hidden="true" />
                  {ticket.createdAt && formatDate(ticket.createdAt)}
                </p>
              </td>
              <td className="px-6 py-4 border-l text-primary">
                <Link to={`/requests/${encodeURI(ticket._id)}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
