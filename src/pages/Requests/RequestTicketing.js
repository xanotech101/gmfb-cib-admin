import { Heading } from 'components/Header/Heading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { RequestTable } from './components/RequestTable/RequestTable';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { ticketService } from 'services';
import ContentLoader from 'react-content-loader';
import { useQuery } from '@tanstack/react-query';
import { useTableSerialNumber } from 'hooks';
import Pagination from 'components/Pagination/Pagination';
import { useState } from 'react';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';

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

export const RequestTicketing = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(undefined);
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['get-tickets', page],
    queryFn: () => ticketService.getTickets({ page, topic: searchValue })
  });
  console.log(data);
  const initialSerialNumber = useTableSerialNumber(page);

  return (
    <div className="p-5">
      <Container>
        <Heading>All Ticket Requests</Heading>
        <p>List of request made in the system.</p>
        <SearchFilter
          placeholder={'Search by topic...'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={refetch}
        />
        {isFetching || isLoading ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <>
            <RenderData data={data} initialSerialNumber={initialSerialNumber} />
            <Pagination
              totalItems={data?.meta?.total ?? 0}
              handlePageClick={setPage}
              currentPage={page}
            />
          </>
        )}
      </Container>
    </div>
  );
};
