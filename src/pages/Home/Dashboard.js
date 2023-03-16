import { Chart } from 'components/Analytics/Analytics';
import Header from 'components/Navbar/Header';
import { Cards } from 'components/Cards/Cards';
import { UserCircleIcon } from '@heroicons/react/20/solid';
// import { Requests } from './RecentRequest';
import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'components/Button/Button';
// import DateTimePicker from 'components/Form/DatePicker/DateTimePicker';
// import { useState } from 'react';
export const Dashboard = () => {
  // const [open, setOpen] = useState('hidden');
  // let toggle = !open ? 'block' : '';
  const stats3 = [
    {
      id: 3,
      name: 'Number of corporate accounts',
      stat: '3 Corporate accounts',
      icon: UserCircleIcon,
      change: '122',
      changeType: 'increase'
    }
  ];
  return (
    <div>
      <Header title="Admin Officer">
        {/* <Button
          variant="black"
          type="button"
          onClick={() => {
            setOpen(!open);
          }}>
          Generate Account Statement
        </Button> */}
        {/* <Link to="/transaction-requests/initiated">
          <Button variant="primary" type="button">
            Initiate Request
          </Button>
        </Link> */}
        {/* <DateTimePicker toggle={toggle} /> */}
      </Header>
      <div className="px-6 py-8">
        <div className="grid grid-cols-12 space-y-5">
          {/* <div className="col-span-12">
            <Requests />
          </div> */}
          <div className="lg:col-span-4 col-span-12">
            <Cards stats={stats3} />
          </div>
          <div className="col-span-12">
            <Chart margin="mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
