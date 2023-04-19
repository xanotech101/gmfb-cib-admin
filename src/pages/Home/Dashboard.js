import Header from 'components/Navbar/Header';
import { Cards } from './Cards/Cards';

import React from 'react';
import { Report } from 'pages/Reporting/Reports';

export const Dashboard = () => {
  return (
    <div>
      <Header title="Admin Officer"></Header>
      <div className="px-6 py-8">
        <div className="grid grid-cols-12 space-y-6">
          <div className="col-span-12 ">
            <Cards />
          </div>
          <div className="col-span-12 ">
            <Report />
          </div>
        </div>
      </div>
    </div>
  );
};
