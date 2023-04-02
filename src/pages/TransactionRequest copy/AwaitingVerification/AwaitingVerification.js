import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import React from 'react';
import { TransactionRequestTable } from '../TransactionRequestTable';

const AwaitingVerification = () => {
  return (
    <div className="space-y-6">
      <p>List of transfers awaiting verification in corporate account</p>
      <div className="mt-4 w-[40%]">
        <SearchFilter placeholder={'Search awaiting transfers...'} />
      </div>
      <TransactionRequestTable transactions={[]} />
    </div>
  );
};

export default AwaitingVerification;
