import Header from 'components/Navbar/Header';
import { Cards } from './components/Stats/Stats.js';
import React from 'react';
import { ticketService } from 'services';
import { useQuery } from '@tanstack/react-query';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { RequestTable } from 'pages/Requests/components/RequestTable/RequestTable';
import ContentLoader from 'react-content-loader';
import { Container } from 'components/Container/Container';
import { Link } from 'react-router-dom';
import { SubHeading } from 'components/Header/SubHeading.js';
import { Button } from 'components/Button/Button';
import { useTableSerialNumber } from 'hooks';

const RenderData = ({ data, initialSerialNumber }) => {
  if (data?.tickets?.length === 0 || !data?.tickets) {
    return (
      <EmptyState
        title="No tickets found"
        description="You have not assigned tickets yet."
        showAction={false}
      />
    );
  } else {
    return <RequestTable tickets={data?.tickets ?? []} initialSerialNumber={initialSerialNumber} />;
  }
};

export const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-tickets'],
    queryFn: () =>
      ticketService.getTickets({
        perPage: 10
      })
  });

  const initialSerialNumber = useTableSerialNumber(1);

  return (
    <div>
      <Header title="Admin Officer"></Header>
      <div className="px-6 py-8">
        <div className="grid grid-cols-12 space-y-6">
          <div className="col-span-12 ">
            <Cards />
          </div>
        </div>
        <Container>
          <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col justify-between lg:items-center md:items-center sm:items-start items-start space-y-4 ">
            <SubHeading>Ticket Requests</SubHeading>
            <Link to="/requests">
              <Button variant="black">View all</Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="mt-5">
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            </div>
          ) : (
            <RenderData data={data} initialSerialNumber={initialSerialNumber} />
          )}
        </Container>
      </div>
    </div>
  );
};
