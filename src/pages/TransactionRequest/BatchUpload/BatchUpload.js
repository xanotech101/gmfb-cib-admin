import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { FileUpload } from 'components/Form/FileUpload/FileUpload';
import { useConvertFileToJson, useModal } from 'hooks';
import { Button } from 'components/Button/Button';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { transactionService } from 'services';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Resolve } from './Resolve';
export const BatchUpload = () => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const [resolve, setResolve] = useState('');
  const [upload, setUpload] = useState(false);
  const { convertFile, columns, rows, file, clearFile } = useConvertFileToJson();

  let text;
  text = resolve === true ? 'Resolving...' : 'Resolve Accounts';

  const { mutate } = useMutation({
    mutationFn: () => transactionService.bulkUploadTransaction(file),
    onSuccess: () => {
      navigate('/transaction-requests/initiated');
    },
    onSettled: () => {
      showModal();
    }
  });

  const bulkResolveAccount = () => {
    setResolve(true);
    setTimeout(() => {
      setResolve(false);
      rows.push('Status');
      columns.map((column) => column.push('verified'));
    }, 8000);
  };

  return (
    <>
      <div className="px-5 py-8">
        <Container>
          <div className="mb-3">
            <Heading>
              <div className="flex lg:items-center gap-7 md:gap-7 flex-col sm:flex-col md:flex-col lg:flex-row lg:justify-between">
                <div>
                  <h2 className="text-2xl">Batch Upload</h2>
                  <p className="text-sm mt-2">Upload batch files</p>
                </div>
                <div className="w-40">
                  {resolve === false && (
                    <Button>
                      Download file
                      <ArrowDownIcon className="w-6 h-6 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </Heading>
          </div>

          <FileUpload
            accept=".csv, .xlsx, .xls"
            id="file-upload"
            infoText="Upload a CSV or Excel file"
            file={file}
            onChange={convertFile}
            removeFile={() => {
              clearFile();
              setResolve('');
            }}
          >
            <div className="mt-4 flex justify-center gap-3">
              {resolve === '' && (
                <Button
                  onClick={() => {
                    bulkResolveAccount();
                  }}
                >
                  {text}
                </Button>
              )}
              {resolve === false ? (
                <Button
                  onClick={() => {
                    showModal();
                    setUpload(!upload);
                    mutate();
                  }}
                >
                  Upload <CloudArrowUpIcon className="w-6 h-6 ml-2" />
                </Button>
              ) : (
                ''
              )}
            </div>
          </FileUpload>
          <div className="relative overflow-x-auto mt-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs bg-gray-100  uppercase border text-black">
                <tr>
                  {rows.map((row, index) => {
                    return (
                      <th scope="col" className="px-6 py-3" key={index}>
                        {row}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {columns.map((value, index) => {
                  return (
                    <tr className="border" key={index}>
                      {value.map((val, i) => {
                        return (
                          <td className="px-6 py-4 border-l" key={i}>
                            <span
                              className={`${
                                val === 'verified'
                                  ? 'bg-green-100 text-green-700 p-1.5 rounded-lg'
                                  : ''
                              }`}
                            >
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Container>
      </div>
      {upload &&
        Modal({
          children: (
            <div className="flex justify-center p-8">
              <GridLoader size={25} color={'#891c69'} />
            </div>
          ),
          showCloseIcon: false
        })}
      {resolve === true && <Resolve />}
    </>
  );
};
