import { Container } from 'components/Container/Container';
import { Heading } from 'components/Header/Heading';
import { FileUpload } from 'components/Form/FileUpload/FileUpload';
import { useConvertFileToJson, useModal } from 'hooks';
import { Button } from 'components/Button/Button';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { accountService } from 'services';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'components/Spinner/Spinner';
import { SubHeading } from 'components/Header/SubHeading';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Preview } from './Preview';
import { Error } from './Error';
import { useForm } from 'react-hook-form';
import { Select } from 'components/Form/Select/Select';
import { notification } from 'utils';

export const BatchUpload = () => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const [duplicateAccounts, setDuplicateAccounts] = useState([]);
  const [duplicateUsers, setDuplicateUsers] = useState([]);
  const [invalidAccounts, setInvalidAccounts] = useState([]);
  const {
    control,
    getValues,
    formState: { errors }
  } = useForm();

  const { convertFile, file, clearFile, jsonArray } = useConvertFileToJson();

  const resetErrors = () => {
    setDuplicateAccounts([]);
    setDuplicateUsers([]);
    setInvalidAccounts([]);
  };

  const { mutate } = useMutation({
    mutationFn: (data) => accountService.bulkUploadAccount(data),
    onSuccess: (data) => {
      const {
        duplicateAccounts: _duplicateAccounts,
        duplicateUsers: _duplicateUsers,
        invalidAccounts: _invalidAccounts
      } = data;
      setDuplicateAccounts(_duplicateAccounts);
      setDuplicateUsers(_duplicateUsers);
      setInvalidAccounts(_invalidAccounts);

      if (
        _duplicateAccounts.length === 0 &&
        _duplicateUsers.length === 0 &&
        _invalidAccounts.length === 0
      ) {
        navigate('/accounts');
      }
    },
    onSettled: () => {
      showModal(false);
    },
    onError() {
      showModal(false);
    }
  });

  const { data: accountLabels } = useQuery({
    queryFn: () => accountService.getAccountLabels(),
    queryKey: ['account-labels']
  });

  const handleUpload = () => {
    const { organizationLabel } = getValues();
    if (!organizationLabel) {
      notification('Please select an organization label', 'error');
      return;
    }
    showModal();
    clearFile();
    resetErrors();
    mutate({ file, organizationLabel: organizationLabel.value });
  };

  return (
    <>
      <div className="px-5 py-8">
        <Container>
          <div className="mb-3">
            <Heading>
              <div className="flex lg:items-center gap-7 md:gap-7 flex-col sm:flex-col md:flex-col lg:flex-row lg:justify-between">
                <div>
                  <h2 className="text-2xl">Batch Account Onboard</h2>
                  <p className="text-sm mt-2 font-normal">Upload a valid csv/xls file</p>
                </div>

                <div className="flex items-center gap-5">
                  <div className="relative mb-2 text-right">
                    <a
                      href={`${process.env.PUBLIC_URL}/gmfb-cib-bulk-account-onboarding-template.xlsx`}
                      download>
                      <Button
                        buttonText="Generate Template"
                        hidden="hidden"
                        rounded="rounded-md"
                        variant="outline">
                        Download template
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Heading>
          </div>
          <FileUpload
            accept=".csv, .xlsx, .xls"
            id="file-upload"
            infoText="Upload a CSV or Excel file"
            file={file}
            onChange={(file) => {
              resetErrors();
              convertFile(file);
            }}
            removeFile={() => {
              resetErrors();
              clearFile();
            }}>
            <div className="mt-4 flex justify-center gap-3 items-end">
              <div className="min-w-[320px]">
                <Select
                  label="Select Organization Label"
                  name="organizationLabel"
                  control={control}
                  options={(accountLabels ?? []).map(({ _id, label }) => ({
                    label,
                    value: _id
                  }))}
                  error={errors.organizationLabel && 'Organization Label is required'}
                />
              </div>
              <Button onClick={handleUpload}>
                Upload <CloudArrowUpIcon className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </FileUpload>
          {jsonArray.length > 0 && <Preview items={jsonArray} />}
          <Error
            duplicateAccounts={duplicateAccounts}
            duplicateUsers={duplicateUsers}
            invalidAccounts={invalidAccounts}
          />
        </Container>
      </div>
      {Modal({
        children: (
          <div className="flex flex-col items-center">
            <Spinner />
            <SubHeading className="text-center  text-xl font-semibold">Processing......</SubHeading>
            <p className="mt-5 text-center">
              This may take a while, please don&apos;t close this page.
            </p>
          </div>
        ),
        showCloseIcon: false,
        dismissOnclickOutside: false
      })}
    </>
  );
};
