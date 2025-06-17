import { Container } from 'components/Container/Container';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { settingsService } from 'services/settings';
import ContentLoader from 'react-content-loader';
import { notification } from 'utils';
import { useModal } from 'hooks';

export const Providers = () => {
  const { Modal, showModal } = useModal();
  const { data: providers, isLoading } = useQuery({
    queryKey: ['bulkTransferProviders'],
    queryFn: () =>
      settingsService.getBulkTransferProviders().then((res) => {
        const activeProvider = res.find((provider) => provider.isActive);
        if (activeProvider) {
          setValue('bulk-payment-provider', {
            label: activeProvider.name,
            value: activeProvider._id
          });
        }
        return res;
      })
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: (id) => settingsService.toggleProviderStatus(id),
    onSuccess: () => {
      notification('Provider status updated successfully', 'success');
      showModal(false);
    },
    onError: () => {}
  });

  const onSubmit = (data) => {
    const selectedProvider = data['bulk-payment-provider'];
    if (selectedProvider) {
      const isActive = providers.find(
        (provider) => provider._id === selectedProvider.value
      )?.isActive;
      if (isActive) {
        notification('This provider is already active', 'info');
        return;
      }
      showModal();
    } else {
      notification('Please select a provider', 'error');
    }
  };

  return (
    <Container>
      {isLoading ? (
        <div className="mt-5">
          <ContentLoader viewBox="0 0 380 70">
            <rect x="0" y="0" rx="5" ry="5" width="380" height="70" />
          </ContentLoader>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Select
            label="Bulk Payment Provider"
            name="bulk-payment-provider"
            isMulti={false}
            placeholder="Select a provider"
            control={control}
            options={(providers ?? [])?.map((p) => ({
              label: p.name,
              value: p._id
            }))}
            error={errors['bulk-payment-provider'] && 'Please select a provider'}
          />
          <Button type="submit" className="mt-5" disabled={isSubmitting}>
            Save Changes
          </Button>
        </form>
      )}
      {Modal({
        children: (
          <>
            <h1>Update Provider</h1>
            <p className="text-sm mt-1 text-gray-500">
              Are you sure you want to update the bulk payment provider? This will change the active
              provider for processing bulk payments.
            </p>
            <div className="flex items-center mt-8 gap-4">
              <Button
                disabled={isSubmitting}
                onClick={() => {
                  const providerId = getValues('bulk-payment-provider')?.value;
                  mutate(providerId);
                }}>
                Update Provider
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  showModal(false);
                }}>
                Close
              </Button>
            </div>
          </>
        )
      })}
    </Container>
  );
};
