import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { FileUpload } from 'components/Form/FileUpload/FileUpload';
import { useConvertFileToJson } from 'hooks';
import { Button } from 'components/Button/Button';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

export const BatchUpload = () => {
  const { convertFile, columns, rows, file, clearFile } = useConvertFileToJson();

  return (
    <div className="px-5 py-8">
      <Container>
        <div className="mb-3">
          <Heading>
            <h2 className="text-2xl">Batch Upload</h2>
            <p className="text-sm mt-2">Upload batch files</p>
          </Heading>
        </div>

        <FileUpload
          accept=".csv, .xlsx, .xls"
          id="file-upload"
          infoText="Upload a CSV or Excel file"
          file={file}
          onChange={convertFile}
          removeFile={clearFile}
        >
          <div className="mt-4 flex justify-center">
            <Button>
              Upload <CloudArrowUpIcon className="w-6 h-6 ml-2" />
            </Button>
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
                          {val}
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
  );
};
