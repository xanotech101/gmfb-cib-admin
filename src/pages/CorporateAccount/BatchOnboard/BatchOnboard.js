/* eslint-disable no-unused-vars */
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Header/Heading';
import { FileUpload } from 'components/Form/FileUpload/FileUpload';
import { useConvertFileToJson, useCustomerInfo, useModal } from 'hooks';
import { Button } from 'components/Button/Button';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { transactionService } from 'services';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'components/Spinner/Spinner';
import { SubHeading } from 'components/Header/SubHeading';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Preview } from './Preview';
import { Error } from './Error';
import { useForm } from 'react-hook-form';
import { notification } from 'utils';

export const BatchUpload = () => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const [errors, setErrors] = useState([]);
  const customerInfo = useCustomerInfo();
  const { control, getValues } = useForm();
  const [upload, setUpoad] = useState(true);
  const accounts = useMemo(() => {
    return customerInfo?.data?.Accounts?.map((account) => ({
      label: (
        <span>
          {account.accountNumber} - <strong>(N{account.ledgerBalance})</strong>
        </span>
      ),
      value: account.accountNumber
    }));
  }, [customerInfo]);

  useQuery({
    queryKey: ['bank-lists'],
    queryFn: transactionService.getBankList,
    onSuccess: (data) => {
      console.log(data);
    }
  });

  const { convertFile, file, clearFile, jsonArray } = useConvertFileToJson();

  const { mutate } = useMutation({
    mutationFn: (data) => transactionService.bulkUploadTransaction(data),
    onSuccess: ({ data }) => {
      const { unresolvedAccount, unresolvedMandates } = data;
      const combinedErrors = [...unresolvedAccount, ...unresolvedMandates];
      if (combinedErrors.length === 0) {
        navigate('/transaction-requests/initiated');
      } else {
        setErrors(combinedErrors);
      }
    },
    onSettled: () => {
      showModal();
    }
  });

  const handleUpload = () => {
    showModal();
    setTimeout(() => {
      setUpoad(false);
    }, 3000);
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
                    <a href="/gmfb-cib-bulk-upload-template.xlsx" download>
                      <Button
                        buttonText="Generate Template"
                        hidden="hidden"
                        rounded="rounded-md"
                        variant="outline">
                        Generate Template
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
              convertFile(file);
              setErrors([]);
            }}
            removeFile={() => {
              clearFile();
            }}>
            <div className="mt-4 flex justify-center">
              {upload !== false ? (
                <Button onClick={handleUpload}>
                  Upload <CloudArrowUpIcon className="w-6 h-6 ml-2" />
                </Button>
              ) : (
                <Button>Submit</Button>
              )}
            </div>
          </FileUpload>
          {jsonArray.length > 0 && <Preview items={jsonArray} />}
          {errors.length > 0 && <Error items={errors} />}
        </Container>
      </div>
      {upload !== false &&
        Modal({
          children: (
            <div className="flex flex-col items-center">
              <Spinner />
              <SubHeading className="text-center  text-xl font-semibold">
                Processing Requests......
              </SubHeading>
              <p className="mt-5 text-center">
                This may take a few seconds, please {"don't"} close this page.
              </p>
            </div>
          ),
          showCloseIcon: false,
          dismissOnclickOutside: false
        })}
    </>
  );
};
