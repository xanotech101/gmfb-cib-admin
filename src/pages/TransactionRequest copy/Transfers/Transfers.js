import React from 'react';
import { TransactionRequestTable } from '../TransactionRequestTable';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
const Transfers = () => {
  return (
    <div className="space-y-6">
      <p>List of transfers made in corporate accounts</p>
      <div className="mt-4 w-[40%]">
        <SearchFilter placeholder={'Search verified transfers.....'} />
      </div>
      <TransactionRequestTable transactions={[]} />
    </div>
  );
};

export default Transfers;
