import { ClockIcon } from '@heroicons/react/20/solid';
import { Button } from 'components/Button/Button';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { Link } from 'react-router-dom';
export const RequestTable = ({ trails }) => {
  return (
    <>
      {trails?.length === 0 ? (
        <EmptyState title="No request created yet" action={() => {}} description="Add request" />
      ) : (
        <div>
          <div className="flex justify-end my-5  align-start lg:align-center flex-col lg:flex-row ">
            <Link to="/requests/add-request">
              <Button>Add Request</Button>
            </Link>
          </div>
          <div className="mb-4 w-[39%]">
            <SearchFilter placeholder={'Search for request made....'} />
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-gray-100  uppercase border text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Time Created
                </th>
              </tr>
            </thead>
            <tbody>
              {trails.map((trail) => (
                <tr className="border  hover:bg-gray-50" key={trail._id}>
                  <td className="px-6 py-4 border-l">{trail.action}</td>
                  <td className="px-6 py-4 border-l">{`${trail.user.firstName} ${trail.user.lastName}`}</td>
                  <td className="px-6 py-4 border-l">
                    <p className="mt-4 gap-2 flex items-center text-sm text-gray-500">
                      {trail.message}
                    </p>
                  </td>
                  <td className="px-6 py-4 border-l">
                    <p className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                      <ClockIcon
                        className=" h-5 w-5 flex-shrink-0  grooming-text"
                        aria-hidden="true"
                      />
                      {trail.timeCreated}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
