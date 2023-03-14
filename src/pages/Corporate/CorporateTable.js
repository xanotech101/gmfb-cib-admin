import React from 'react';
import { useModal } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SplitButton } from 'components/Button/SplitButton';
import { DeleteCorperate } from './DeleteCorporateUser';
import { Avatar } from 'components/Avatar/Avatar';
import SwitchRoles from 'pages/Settings/User/SwitchRoles/SwitchRoles';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { Heading } from 'components/Common/Header/Heading';
export const CorperateTable = ({ CorperateData }) => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const [roles, setRoles] = useState(false);
  const [details, setDetails] = useState(null);
  const [view, setView] = useState(false);
  const actionItems = (details) => [
    {
      name: 'Edit',
      action: () => {
        navigate('/corporate/edit-user');
      }
    },
    {
      name: 'Delete',
      action: () => {
        showModal();
        setRoles(false);
        setDetails('');
        setView('');
      }
    },
    {
      name: 'Assign Roles',
      action: () => {
        showModal();
        setRoles(true);
        setDetails(details);
        setView('');
      }
    }
  ];
  const handleView = (e) => {
    showModal();
    setView(e);
    setDetails('');
    setRoles(false);
  };
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
                  Branch
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                  Action
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
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                    <Avatar name={`${data.name.firstName} ${data.name.lastName}`} />{' '}
                    <span className="ml-2">
                      {data.name.firstName} {data.name.lastName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm  font-medium text-gray-800 whitespace-nowrap border">
                    {data.email}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <SplitButton
                      buttonText="View"
                      items={actionItems(`${data.name.firstName} ${data.name.lastName}`)}
                      mainButtonAction={() => {
                        handleView(
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 justify-between">
                              <p>Name</p>
                              <p>
                                <Avatar name={`${data.name.firstName} ${data.name.lastName}`} />
                                {data.name.firstName} {data.name.lastName}{' '}
                              </p>
                            </div>
                            <hr />
                            <div className="flex items-center gap-3 justify-between">
                              <p>Branch</p>
                              <p>
                               
                                {data.email}
                              </p>
                            </div>
                            <hr />
                            <div className="flex items-center gap-3 justify-between">
                              <p>Admin</p>
                              <p>
                               admin
                              </p>
                            </div>
                            <hr />
                          </div>
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Modal({
            children:
              roles === true ? (
                <SwitchRoles userName={details} />
              ) : view ? (
                <div>
                  <Heading>Corporate Details</Heading>
                  {view}
                </div>
              ) : (
                <DeleteCorperate deleteUser={() => navigate('/delete-corperate')} />
              ),
            size: 'md'
          })}
        </div>
      </div>
    </div>
  );
};
