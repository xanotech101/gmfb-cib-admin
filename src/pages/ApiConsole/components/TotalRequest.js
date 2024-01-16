import { DocumentArrowDownIcon, FolderMinusIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/Button/Button';
import { Label } from 'components/Form/Label/Label';
import { SubHeading } from 'components/Header/SubHeading';
import ContentLoader from 'react-content-loader';
import ReactDatePicker from 'react-datepicker';

export const TotalRequest = ({
  name,
  date,
  setDate,
  isFetching,
  totalCount,
  downloadCSV,
  showModal
}) => {
  return (
    <div>
      <SubHeading>Total number of request for {name}</SubHeading>
      <div className="mt-5">
        <div className="mb-4 flex items-center gap-5">
          <div>
            <Label label={'Filter by month or year'} />
            <ReactDatePicker
              selected={date}
              showMonthYearDropdown
              onChange={(date) => {
                setDate(date);
              }}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              className="block w-[100px] mt-1 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </div>
        <div>
          {isFetching ? (
            <ContentLoader viewBox="0 0 380 70"></ContentLoader>
          ) : (
            <div className="mb-10">
              {totalCount?.analytics.length === 0 ? (
                <div className="flex justify-center flex-col items-center my-5 gap-4">
                  <SubHeading>No request found come back later</SubHeading>
                  <FolderMinusIcon className="w-9 h-9 text-primary" />
                  <Button variant="outline" onClick={showModal}>
                    Exit
                  </Button>
                </div>
              ) : (
                totalCount?.analytics?.map((count, i) => (
                  <div key={i} className="space-y-6">
                    <div className="flex justify-between border-b py-2">
                      <p className="text-gray-700">Year:</p>
                      <p>{count?.year}</p>
                    </div>
                    <div className="flex justify-between border-b py-2">
                      <p className="text-gray-700">Month:</p>
                      <p>{count?.month}</p>
                    </div>
                    <div className="flex justify-between border-b py-2">
                      <p className="text-gray-700">Total number of request:</p>
                      <p>{count?.numberOfRequests}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <Button
          onClick={() => {
            downloadCSV();
            showModal();
          }}
          variant="primary"
          isFullWidth
          disabled={totalCount?.analytics.length === 0}>
          Export Data <DocumentArrowDownIcon className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
