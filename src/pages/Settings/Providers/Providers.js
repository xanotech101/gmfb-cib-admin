import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Container } from 'components/Container/Container';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { settingsService } from 'services';
import { notification } from 'utils';

export const Providers = () => {
  const queryClient = useQueryClient();
  const [updatingId, setUpdatingId] = useState(null);

  const { data: providers, isLoading } = useQuery({
    queryKey: ['transferProviders'],
    queryFn: () => settingsService.getTransferProviders()
  });

  const { mutate } = useMutation({
    mutationFn: (providerId) => settingsService.updateTransferProvider(providerId),
    onSuccess: () => {
      notification('Provider status updated successfully', 'success');
      queryClient.invalidateQueries(['transferProviders']);
      setUpdatingId(null);
    },
    onError: () => {
      notification('Failed to update provider status', 'error');
      setUpdatingId(null);
    }
  });

  const handleToggle = (providerId) => {
    setUpdatingId(providerId);
    mutate(providerId);
  };

  return (
    <Container>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Transfer Providers</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage transfer providers by toggling their active status
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ContentLoader key={i} viewBox="0 0 400 80" className="w-full">
              <rect x="0" y="0" rx="8" ry="8" width="400" height="80" />
            </ContentLoader>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {providers?.map((provider) => (
            <div
              key={provider._id}
              className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">
                  {provider.name === 'Eazypay' ? 'Multipay' : provider.name}
                </h3>
                {provider.description && (
                  <p className="text-sm text-gray-500 mt-1">{provider.description}</p>
                )}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                    provider.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                  {provider.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="ml-4">
                <button
                  type="button"
                  onClick={() => handleToggle(provider._id)}
                  disabled={updatingId === provider._id}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    provider.isActive ? 'bg-blue-600' : 'bg-gray-200'
                  } ${updatingId === provider._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  role="switch"
                  aria-checked={provider.isActive}>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      provider.isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}

          {(!providers || providers.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transfer providers found</p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};
