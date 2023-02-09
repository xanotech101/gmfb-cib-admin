import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Input } from 'components/Form/Input/Input';
import { mandateService } from 'services';
import { MandateRuleTable } from './MandateRuleTable';
import { useModal } from 'hooks/useModal';
import { MandateDetails } from './MandateRuleDetails/MandateRuleDetails';

export const MandateRule = () => {
  const [currentMandate, setCurrentMandate] = useState(null);
  const { showModal, Modal } = useModal();

  const { data, isFetching } = useQuery({
    queryKey: ['mandateRule'],
    queryFn: mandateService.getAll
  });

  const setMandate = (mandate) => {
    setCurrentMandate(mandate);
    showModal();
  };

  return (
    <div className="px-6 mt-10">
      <Container>
        <div className="p-3">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Mandate Rules</h1>
              <p className="text-sm text-gray-700">List of mandate rules within the system.</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link to="/mandate-rule/create">
                <Button variant="primary" type="button">
                  Create Mandate
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-1/4 mt-5">
            <Input placeholder="Search..." type="search" />
          </div>

          {isFetching ? (
            <div className="mt-5">
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            </div>
          ) : (
            <MandateRuleTable
              mandates={data?.mandate ?? []}
              isLoading={isFetching}
              setMandate={setMandate}
            />
          )}
        </div>
      </Container>
      {Modal({ children: <MandateDetails mandate={currentMandate} />, size: 'lg' })}
    </div>
  );
};
