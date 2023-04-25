import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { RequestTable } from './components/RequestTable/RequestTable';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { ticketService } from 'services';
import ContentLoader from 'react-content-loader';
import { useQuery } from '@tanstack/react-query';

const RenderData = ({ data }) => {
  if (data?.tickets?.length === 0) {
    return (
      <EmptyState
        title="No tickets found"
        description="You have not assigned tickets yet."
        showAction={false}
      />
    );
  } else {
    return <RequestTable tickets={data?.tickets ?? []} />;
  }
};

const RequestTicketing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-tickets'],
    queryFn: ticketService.getTickets
  });

  return (
    <div className="p-5">
      <Container>
        <Heading>All Request</Heading>
        <div className="flex justify-between  my-2  align-start lg:align-center flex-col lg:flex-row ">
          <p>List of request made in the system.</p>
        </div>
        {isLoading ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <RenderData data={data} />
        )}
      </Container>
    </div>
  );
};
export default RequestTicketing;
