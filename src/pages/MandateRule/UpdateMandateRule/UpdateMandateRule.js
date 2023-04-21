import { useQuery } from '@tanstack/react-query';
import { GridLoader } from 'react-spinners';
import { Container } from 'components/Container/Container';
import { LinkButton } from 'components/Button/LinkRouteButton';
import { MandateRuleForm } from '../components/MandateRuleForm/MandateRuleForm';
import { useParams } from 'react-router-dom';
import { mandateService } from 'services';

export const UpdateMandateRule = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['mandateRule', id],
    queryFn: () => mandateService.getOne(id),
    enabled: !!id
  });

  return (
    <div className="card px-8 mt-9 gap-5">
      <LinkButton to="/mandate-rule">Back</LinkButton>
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Update Mandate Rule</h2>
        <p className="text-gray-900 mt-1">Please fill in your details below.</p>
        <div className="mt-8">
          {isLoading && (
            <div className="flex justify-center">
              <GridLoader size={25} color={'#891c69'} />
            </div>
          )}
          {data && (
            <MandateRuleForm
              defaultValues={{
                authorisers:
                  data?.mandate?.authorizers?.map(({ firstName, lastName, _id }) => ({
                    label: `${firstName} ${lastName}`,
                    value: _id
                  })) ?? [],
                minAmount: data?.mandate?.minAmount?.toString() ?? '',
                maxAmount: data?.mandate?.maxAmount?.toString() ?? '',
                name: data?.mandate?.name ?? '',
                verifier:
                  {
                    label: `${data?.mandate?.verifier?.firstName} ${data?.mandate?.verifier?.lastName}`,
                    value: data?.mandate?.verifier?._id
                  } ?? {}
              }}
              type="update"
            />
          )}
        </div>
      </Container>
    </div>
  );
};
