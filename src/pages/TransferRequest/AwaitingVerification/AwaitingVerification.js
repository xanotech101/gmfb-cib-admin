import { useState } from 'react';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import { useQuery } from '@tanstack/react-query';
import { TransactionRequestTable } from '../TransactionRequestTable';
import { transactionService } from 'services';
import { EmptyState } from 'components/EmptyState/EmptyState';
import Pagination from 'components/Pagination/Pagination';
import ContentLoader from 'react-content-loader';
import { Container } from 'components/Container/Container';
import { NavLink } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';

const RenderData = ({ data, setPage, page }) => {
  if (data?.requests?.length === 0 || !data) {
    return (
      <EmptyState
        title="No request found"
        description="No request found, please check back later."
      />
    );
  } else {
    return (
      <>
        <TransactionRequestTable transactions={data?.requests ?? []} />
        <Pagination
          totalItems={data?.meta?.total ?? 0}
          handlePageClick={setPage}
          currentPage={page}
        />
      </>
    );
  }
};

const AwaitingVerification = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['awaiting-verification', page],
    queryFn: () =>
      transactionService.getAwaitingVerificationRequest({
        page
      })
  });
  return (
    <div className="flex flex-col mt-7 p-5">
      <div className="p-6">
        <Heading>Transfers Awaiting Verification</Heading>
        <p className="text-sm text-gray-700">
          List of transfers awaiting verification in corporate account
        </p>
        <div className="flex gap-4 font-medium capitalize my-4 border py-3 fit rounded shadow bg-gray-100">
          <NavLink
            to="/transfers/transfer-made"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Transfers
          </NavLink>
          <NavLink
            to="/transfers/awaiting"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Awaiting verification
          </NavLink>
        </div>
      </div>
      <Container>
        <div className="space-y-6">
          <div className="mt-4 w-[40%]">
            <SearchFilter placeholder={'Search awaiting transfers...'} />
          </div>
          {isLoading ? (
            <div className="mt-5">
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            </div>
          ) : (
            <RenderData data={data} setPage={setPage} page={page} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default AwaitingVerification;
