import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Input } from 'components/Form/Input/Input';
import { mandateService } from 'services';
import { MandateRuleTable } from './MandateRuleTable';
import { useModal } from 'hooks/useModal';
import { MandateDetails } from './MandateRuleDetails/MandateRuleDetails';
import { EmptyState } from 'components/EmptyState/EmptyState';

export const MandateRule = () => {
  const navigate = useNavigate();
  const [currentMandate, setCurrentMandate] = useState(null);
  const { showModal, Modal } = useModal();

  const { data, isLoading } = useQuery({
    queryKey: ['mandateRule'],
    queryFn: mandateService.getAll
  });

  const setMandate = (mandate) => {
    setCurrentMandate(mandate);
    showModal();
  };

  const RenderData = () => {
    if (data?.mandates?.length === 0) {
      return (
        <EmptyState
          title="No mandate rule found"
          description="You have not created any mandate rule yet. Click the button below to create one."
          action={{
            label: 'Create mandate rule',
            onClick: () => navigate('/mandate-rule/create')
          }}
        />
      );
    } else {
      return (
        <MandateRuleTable
          mandates={data?.mandates ?? []}
          isLoading={isLoading}
          setMandate={setMandate}
        />
      );
    }
  };

  return (
    <div className="px-6 py-6">
      <Container>
        <div className="p-3">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Mandate Rules</h1>
              <p className="text-sm text-gray-700 mt-1">List of mandate rules within the system.</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link to="/mandate-rule/create">
                <Button variant="primary" type="button">
                  Create Mandate
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:w-full lg:w-3/5 sm:w-full w-full mt-5">
            <Input placeholder="Search..." type="search" />
          </div>

          {isLoading ? (
            <div className="mt-5">
              <ContentLoader viewBox="0 0 380 70">
                <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
              </ContentLoader>
            </div>
          ) : (
            <RenderData />
          )}
          {Modal({ children: <MandateDetails mandate={currentMandate} />, size: 'lg' })}
        </div>
      </Container>
    </div>
  );
};
