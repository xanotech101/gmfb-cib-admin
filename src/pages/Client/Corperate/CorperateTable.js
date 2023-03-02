import React from 'react';
import { Link } from 'react-router-dom';

export const CorperateTable = ({ CorperateData, onClick }) => {
  return (
    <div className="overflow-x-auto">
      <div className="p-1.5 w-full inline-block align-middle">
        <div className=" border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3 pl-4">
                  <div className="flex items-center h-5">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Authorisers ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                  Phone number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                  Mandate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {CorperateData.map((data) => (
                <tr key={data.id}>
                  <td className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox" className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {data.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    {data.authorisersID}
                  </td>
                  <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap">
                    {data.email}
                  </td>
                  <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap">
                    {data.role}
                  </td>
                  <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap">
                    {data.phoneNumber}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link className="grooming-text" to="/edituser">
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link className="grooming-text" to="/mandate-rule">
                      Create mandate
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                      className="text-red-500 hover:text-red-700"
                      href="#"
                      onClick={() => onClick(data.id)}>
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
