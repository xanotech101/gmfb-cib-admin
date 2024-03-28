import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import { accountService } from 'services';

export const WhiteListTable = ({ data, initialSerialNumber, refetch }) => {
  const { mutate } = useMutation({
    mutationKey: ['delete-whitelist'],
    mutationFn: (payload) => accountService.removewhiteListedAccount(payload),
    onSuccess: () => {
      refetch();
    }
  });
  const handleMutate = (account) => {
    const payload = [account?.account_number];

    mutate(payload);
    console.log(payload);
  };
  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="relative  lg:overflow-hidden overflow-x-scroll">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs bg-gray-100 uppercase border text-black font-semibold">
            <tr>
              <th scope="col" className="p-3">
                S/N
              </th>
              <th scope="col" className="p-3">
                Account Number
              </th>
              <th scope="col" className="p-3">
                ID
              </th>

              <th scope="col" className="p-3">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-sm text-gray-500">
            {data?.map((account, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3 border">{initialSerialNumber + i}</td>
                <td className="p-3 border whitespace-nowrap">{account?.account_number}</td>
                <td className="p-3 border break-words capitalize">{account?._id}</td>
                <td className="p-3 border break-words text-primary cursor-pointer">
                  <Dropdown
                    label={<EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />}
                    inline={true}
                    arrowIcon={false}>
                    <Dropdown.Item
                      onClick={() => {
                        handleMutate(account);
                      }}>
                      Remove account number
                    </Dropdown.Item>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
