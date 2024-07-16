import { formatDate } from 'utils';
import {
  ClockIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  Square2StackIcon
} from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { apiUsageService } from 'services/apiUsage.service';
import { Dropdown } from 'flowbite-react';
import { useModal } from 'hooks';
import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { useHandleNextStep } from 'hooks/useHandleNextStep';
import { handleCopyClick } from 'utils/handleCopy';

export const APIKeyTable = ({ data, initialSerialNumber, refetch }) => {
  const { Modal, showModal } = useModal();
  const [name, setName] = useState({});
  const { handleNextStep, currentStep } = useHandleNextStep(2);
  const { mutate, isLoading } = useMutation({
    mutationKey: ['generate-key'],
    mutationFn: (data) => apiUsageService.generateApiKey(data),
    onSuccess: () => {
      handleNextStep();
    }
  });
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-5 mt-4">
            <p>Please note your key is revealed only this time, do well to save it privately.</p>
            <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto" />
            <div className="flex items-center gap-8 justify-center">
              <Button isFullWidth onClick={showModal} variant="danger">
                Cancel
              </Button>
              <Button
                isFullWidth
                disabled={isLoading}
                onClick={() =>
                  mutate({
                    organization_name: name?.organization_name
                  })
                }>
                Continue
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-5 mt-4">
            <p>Please note your key is revealed only this time, click to copy to clipboard.</p>
            <p
              className=" break-words text-gray-600 cursor-pointer"
              onClick={() => handleCopyClick(name?.key)}>
              {name?.key}
              <Square2StackIcon className="w-6 h-6  mx-auto text-primary mt-2" />
            </p>
            <div className="flex items-center gap-8 justify-center">
              <Button
                isFullWidth
                onClick={() => {
                  showModal();
                  refetch();
                }}
                variant="danger">
                Close
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <table className="min-w-full divide-y divide-gray-200 text-left">
      <thead className="text-xs bg-gray-100 uppercase border text-black">
        <tr>
          <th scope="col" className="p-3">
            S/N
          </th>
          <th scope="col" className="p-3">
            Organization Name
          </th>
          <th scope="col" className="p-3">
            API Key
          </th>

          <th scope="col" className="p-3">
            time updated
          </th>
          <th scope="col" className="p-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 ">
        {data?.results?.map((datum, i) => (
          <tr key={datum?._id}>
            <td className="p-3 text-sm font-medium text-gray-800 whitespace-nowrap border">
              {initialSerialNumber + i}
            </td>
            <td className="p-3 text-sm font-medium text-gray-800 whitespace-nowrap border">
              {datum?.organization_name}
            </td>
            <td className="p-3 text-sm  font-medium text-gray-800 whitespace-nowrap border">
              {datum?.key ? '*****************' : 'generate api key'}
            </td>
            <td className="p-3 text-sm font-medium  whitespace-nowrap border">
              <div className="mt-4 flex items-center text-sm text-gray-500 gap-2">
                <ClockIcon className=" h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>{datum?.updatedAt && formatDate(datum.updatedAt)}</div>
              </div>
            </td>
            <td className="p-3 text-sm font-medium whitespace-nowrap border">
              <Dropdown
                label={<EllipsisVerticalIcon className="h-5 w-5 ml-4 text-gray-600" />}
                inline={true}
                arrowIcon={false}>
                <Dropdown.Item
                  className="text-primary cursor-pointer"
                  onClick={() => {
                    showModal();
                    setName(datum);
                  }}>
                  {datum?.key ? 'update api key' : 'generate api key'}
                </Dropdown.Item>
              </Dropdown>
            </td>
          </tr>
        ))}
        {Modal({
          children: <div>{renderFormStep()}</div>,
          showCloseIcon: false
        })}
      </tbody>
    </table>
  );
};
