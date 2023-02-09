import { Chart2 } from 'components/Analytics/Analytics';
import BalanceCard from 'components/Cards/BalanceCard';
import Header from 'components/Navbar/Header';
import { Requests } from './Request/RequestList/Requests';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';

export const Dashboard = () => {
  return (
    <div>
      <Header title="Account Officer">
        <Link to="/batchupload">
          <Button variant="primary" type="button">
            Batch Upload
          </Button>
        </Link>
        <Link to="/initiate-request">
          <Button variant="primary" type="button">
            Initiate Request
          </Button>
        </Link>
      </Header>
      <div className="py-8 card2 px-5">
        <div>
          <Container>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="">
                <Requests header="Recent Transaction Requests" />
              </div>
              <div className="py-4 ">
                <Chart2 margin="mt-6" />
              </div>
            </div>
          </Container>
        </div>
        <div className="mar">
          <Container>
            <div className="px-4  ml-0 md:ml-0 sm:ml-0 lg:ml-3 pt-4 mt-4 md:mt-4 sm:mt-4 lg:mt-0">
              <BalanceCard />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
