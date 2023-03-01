import { Chart } from 'components/Analytics/Analytics';
import BalanceCard from 'components/Cards/BalanceCard';
import Header from 'components/Navbar/Header';
import { Requests } from './RequestList/Requests';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { XCircleIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Cards } from 'components/Cards/Card';
const stats1 = [
  {
    id: 1,
    name: 'Declined Requests',
    stat: '71,897',
    icon: XCircleIcon,
    change: '122',
    changeType: 'increase'
  }
];
const stats2 = [
  {
    id: 1,
    name: 'Approved Requests',
    stat: '71,897',
    icon: CheckCircleIcon,
    change: '122',
    changeType: 'increase'
  }
];
const stats3 = [
  {
    id: 1,
    name: 'Total Request',
    stat: '71,897',
    icon: UserGroupIcon,
    change: '122',
    changeType: 'increase'
  }
];
export const Dashboard = () => {
  return (
    <div>
      <Header title="Admin Officer">
        <Link to="/transaction-requests/initiated">
          <Button variant="primary" type="button">
            Initiate Request
          </Button>
        </Link>
      </Header>
      <div className="py-8 card2 px-5">
        <div>
          <Container>
            <div className="">
              <div className="py-4 ">
                <Chart margin="mt-6" />
              </div>
              <div className="mt-6">
                <Requests />
              </div>
            </div>
          </Container>
        </div>
        <div className="">
          <Container>
            <div className="">
              <BalanceCard />
            </div>
          </Container>
          <div className="mt-5">
            <Cards stats={stats1} />
            <Cards stats={stats2} />
            <Cards stats={stats3} />
          </div>
        </div>
      </div>
    </div>
  );
};
