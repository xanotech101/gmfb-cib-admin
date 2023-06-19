import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { mandateService } from 'services';
import { MandateRuleTable } from './MandateRuleTable';
import { useModal } from 'hooks/useModal';
import { MandateDetails } from './MandateRuleDetails';
import { EmptyState } from 'components/EmptyState/EmptyState';
import SearchFilter from 'components/Form/SearchFilter/SearchFilter';
import Pagination from 'components/Pagination/Pagination';
import { useTableSerialNumber } from 'hooks/useTableSerialNumber';

export const MandateRule = () => {
  const { id: accountId } = useParams();
  const [searchValue, setSearchValue] = useState(undefined);
  const [currentMandate, setCurrentMandate] = useState(null);
  const { showModal, Modal } = useModal();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['mandateRule', { page, accountId }],
    queryFn: () => mandateService.getAll({ page, name: searchValue, organizationId: accountId }),
    enabled: !!accountId
  });
  const initialSerialNumber = useTableSerialNumber(page);

  const setMandate = (mandate) => {
    setCurrentMandate(mandate);
    showModal();
  };

  const RenderData = () => {
    if (data?.mandates?.length === 0) {
      return (
        <EmptyState
          title="No mandate rule found"
          description="You have not created any mandate rule yet."
        />
      );
    } else {
      return (
        <MandateRuleTable
          mandates={data?.mandates ?? []}
          isLoading={isLoading}
          setMandate={setMandate}
          initialSerialNumber={initialSerialNumber}
        />
      );
    }
  };

  return (
    <>
      <div className="px-10 space-y-6 mt-8 pb-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Mandate Rules</h1>
            <p className="text-sm text-gray-700 mt-2">
              List of mandate rules made on this account.
            </p>
          </div>
        </div>

        <SearchFilter
          placeholder={'Search by type....'}
          value={searchValue}
          setValue={setSearchValue}
          onSearch={() => {
            page !== 1 ? setPage(1) : refetch();
          }}
        />

        {isLoading || isFetching ? (
          <div className="mt-5">
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
            </ContentLoader>
          </div>
        ) : (
          <>
            <RenderData />
            <Pagination
              totalItems={data?.meta?.total ?? 0}
              handlePageClick={setPage}
              itemsPerPage={data?.meta?.perPage}
              currentPage={page}
            />
          </>
        )}
      </div>
      {Modal({ children: <MandateDetails mandate={currentMandate} />, size: 'lg' })}
    </>
  );
};
