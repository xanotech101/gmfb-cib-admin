import ContentLoader from 'react-content-loader';
import { TransactionHistoryTable } from '../../../components/TransactionHistory/TransactionHistoryTable';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { useModal, useStore } from 'hooks';
import { Button } from 'components/Button/Button';
import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { DatePickerComponent } from 'components/Form/DatePicker/DateTimePicker';
import { useState } from 'react';
import { useTransactionHistory } from 'hooks';
import Pagination from 'components/Pagination/Pagination';

export const RenderData = (data) => {
  if (!data?.data?.IsSuccessful || data?.data?.Message.length === 0) {
    return (
      <EmptyState
        title="No transactions"
        description="You are yet to make a transaction. Check back later."
      />
    );
  } else {
    return <TransactionHistoryTable transactions={data?.data?.Message?.data ?? []} />;
  }
};

export const TransactionHistory = () => {
  const { Modal, showModal } = useModal();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const { currentOrganization } = useStore();

  const { accountStatement, transactions } = useTransactionHistory(
    { PageSize: 50 },
    page,
    currentOrganization?.accountNumber?.[0]
  );

  return (
    <div className="px-10 space-y-6 py-8">
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Transaction History</h3>
        <Button
          variant="black"
          type="button"
          onClick={() => {
            showModal();
          }}>
          Generate Account Statement
        </Button>
      </div>
      <div className="mt-5">
        {transactions.isLoading ? (
          <ContentLoader viewBox="0 0 380 70">
            <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
          </ContentLoader>
        ) : (
          <>
            <RenderData data={transactions.data} />
            <Pagination
              totalItems={transactions?.data?.Message?.page?.totalCount ?? 0}
              handlePageClick={setPage}
              currentPage={page}
              itemsPerPage={50}
            />
          </>
        )}
      </div>

      {Modal({
        children: (
          <div className="space-y-6">
            <p className="font-medium">Generate Account Statement</p>
            <DatePickerComponent
              handleDate={setFromDate}
              label="Start Date"
              id="fromDate"
              value={fromDate}
            />
            <DatePickerComponent
              handleDate={setToDate}
              label="End Date"
              id="toDate"
              value={toDate}
            />
            <Button
              isFullWidth
              onClick={() => accountStatement.download({ fromDate, toDate, showModal })}
              disabled={accountStatement.downloading}>
              <div className="flex items-center gap-2">
                Download Account Statement
                <ArrowDownIcon className="w-5 h-5" />
              </div>
            </Button>
          </div>
        ),
        showCloseIcon: false
      })}
    </div>
  );
};
