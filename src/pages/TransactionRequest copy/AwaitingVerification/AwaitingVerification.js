import React from 'react';
import { TransactionRequestTable } from '../TransactionRequestTable';

const AwaitingVerification = () => {
  return (
    <div className="space-y-6">
      <p>List of transfers awaiting verification in corporate account</p>
      <TransactionRequestTable transactions={[]} />
    </div>
  );
};

export default AwaitingVerification;
