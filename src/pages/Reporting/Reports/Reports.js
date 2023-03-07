import { Chart } from 'components/Analytics/Analytics';
import { TransactionHistoryTable } from '../TransactionHistory/TransactionHistoryTable';
import { Cards } from 'components/Cards/Cards';
import { Heading } from 'components/Common/Header/Heading';
import { CheckCircleIcon, UserGroupIcon, XCircleIcon} from '@heroicons/react/20/solid';
// import { Container } from 'components/Container/Container';
import React from 'react';
const transactions = [
  {
    id: 1,
    accountNumber: '0827850666',
    bank: 'Access bank',
    img: 'http://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png',
    transactionID: '7899999678D',
    name: 'Perfection Chizuruoke',
    type: 'authorisation',
    date: '16 feb 2023',
    amount: '678',
    status: 'declined',
    time: '12:39:12'
  },
  {
    id: 2,
    accountNumber: '0827850666',
    bank: 'Access bank',
    img: 'http://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png',
    transactionID: '78999996899FD',
    name: 'Adenuga Tunmise',
    type: 'Initiator',
    date: '16 feb 2023',
    amount: '678',
    status: 'pending',
    time: '12:39:12'
  },
  {
    id: 3,
    accountNumber: '0827850666',
    bank: 'Access bank',
    img: 'http://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png',
    transactionID: '78999996788FD',
    name: 'Perfection Chizuruoke',
    type: 'Verification',
    date: '16 feb 2023',
    amount: '678',
    status: 'approved',
    time: '12:39:12'
  },
  {
    id: 4,
    accountNumber: '0827850666',
    bank: 'Access bank',
    img: 'https://static.zennioptical.com/marketing/information/infographic/best-eyeglasses-for-face-shape/round-person2.png',
    transactionID: '78999996980RF',
    name: 'Demilade otuianya',
    type: 'authorisation',
    date: '16 feb 2023',
    amount: '678',
    status: 'in progress',
    time: '12:39:12'
  },
  {
    id: 5,
    accountNumber: '0827850666',
    bank: 'Access bank',
    img: 'http://www.zennioptical.com/blog/wp-content/uploads/2017/08/square-glasses-round-face.jpg',
    transactionID: '789999990YG',
    name: 'Chinedu Uche',
    type: 'authorisation',
    date: '16 feb 2023',
    amount: '678',
    status: 'awaiting verification',
    time: '12:39:12'
  }
];
const stats1 = [
  {
    id: 1,
    name: 'Total Request',
    stat: '71,897',
    icon: UserGroupIcon,
    change: '122',
    changeType: 'increase'
  },
];
const stats2 = [
  {
    id: 2,
    name: 'Declined Request',
    stat: '71,897',
    icon: XCircleIcon,
    change: '122',
    changeType: 'increase'
  }
];
const stats3 = [
  {
    id: 3,
    name: 'Approved Request',
    stat: '71,897',
    icon: CheckCircleIcon,
    change: '122',
    changeType: 'increase'
  }
];

export const Report = () => {
  return (
    <div className="my-7 ml-2 px-5">
      <div className="py-5">
        <div className="">
          {/* <Container> */}
          <div className="mb-5">
            <Heading>Reporting Transaction</Heading>
            
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-7">
            <Cards stats={stats1} />
            <Cards stats={stats2} />
            <Cards stats={stats3} />
          </div>
          <Chart hidden="hidden" margin="mt-0" />
          <TransactionHistoryTable transactions={transactions} />
          {/* </Container> */}
        </div>
      </div>
    </div>
  );
};
