import { Chart2, PieChart } from 'components/Analytics/Analytics';
import { Container } from 'components/Container/Container';
import React from 'react';

export const AdminReport = () => {
  return (
    <div className="my-7 ml-2">
      <div className="Dash px-5">
        <Container>
          <div>
            <Chart2 hidden="hidden" margin="mt-0" />
          </div>
        </Container>
        <Container>
          <div>
            <PieChart />
          </div>
        </Container>
      </div>
    </div>
  );
};
