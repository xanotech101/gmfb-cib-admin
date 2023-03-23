import { Transaction } from 'pages/Transaction';
import React from 'react';
import { Heading } from './Header/Heading';
export default function TabsContent(prop) {
  const { openTab } = prop;
  return (
    <div>
      <div className="">
        <div className="py-5 flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
              <div className="ml-2">
                <Heading>All Active Requests</Heading>
              </div>
              <div className="w-full">
                <Transaction />
              </div>
            </div>
            <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
              <div className="ml-2">
                <Heading>Approved Requests</Heading>
              </div>
              <Transaction />
            </div>
            <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
              <div className="ml-2">
                <Heading>Declined Requests</Heading>
              </div>
              <Transaction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
