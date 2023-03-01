import { Button } from 'components/Button/Button';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Container } from 'components/Container/Container';
import { Link } from 'react-router-dom';
import { Drop } from '../../../components/Analytics/dp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';
export const TransactionHistoryTable= ({transactions}) => {
  return (
    <div className=" mt-6">
      <Container>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <SubHeading>Transaction History</SubHeading>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button>Export</Button>
          </div>
        </div>
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-gray-200  uppercase border text-black text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  s/n
                </th>
                <th scope="col" className="px-6 py-3">
                  account name
                </th>
                <th scope="col" className="px-6 py-3">
                  bank name
                </th>
                <th scope="col" className="px-6 py-3">
                  account number
                </th>
                <th scope="col" className="px-6 py-3">
                  Authorisers id
                </th>
                <th scope="col" className="px-6 py-3">
                  time
                </th>
                <th scope="col" className="px-9 py-3">
                  date
                </th>
                <th scope="col" className="px-6 py-3">
                  amount
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y border-b divide-gray-200 bg-white capitalize">
              {transactions.map((user) => (
                <tr className="border  hover:bg-gray-50 " key={user.id}>
                  <td className="px-6 py-4 border-l">{user.id}</td>
                  <td className="px-6 py-4 border-l">{user.name}</td>
                  <td className="px-6 py-4 border-l">{user.bank}</td>
                  <td className="px-6 py-4 border-l">{user.accountNumber}</td>
                  <td className="px-6 py-4 border-l">{user.transactionID}</td>
                  <td className="px-6 py-4 border-l">{user.time} </td>
                  <td className="px-6 py-4 border-l">{user.date}</td>
                  <td className="px-6 py-4 border-l">
                    <div>
                      <span>
                        <FontAwesomeIcon icon={faNairaSign} />
                        {user.amount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-l">
                    <div className="flex items-center gap-3 justify-center">
                      <p>{user.status}</p>
                      <p>
                        <Drop />
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to="/reports"
            className={`flex w-full items-center justify-center mt-6 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 `}>
            View all
          </Link>
        </div>
      </Container>
    </div>
  );
};
