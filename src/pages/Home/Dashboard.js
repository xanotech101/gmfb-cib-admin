import Header from 'components/Navbar/Header';
import { Cards } from './Cards/Cards';

import React from 'react';

export const Dashboard = () => {
  return (
    <div>
      <Header title="Admin Officer"></Header>
      <div className="px-6 py-8">
        <div className="grid grid-cols-12 space-y-6">
          <div className="col-span-12 ">
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};
