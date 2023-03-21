import React from 'react';
import { TransactionRequestTable } from '../TransactionRequestTable';

const Transfers = () => {
  return (
    <div className="space-y-6">
      <p>List of transfers made in corporate accounts</p>
      <TransactionRequestTable transactions={[]} />
    </div>
  );
};

export default Transfers;
