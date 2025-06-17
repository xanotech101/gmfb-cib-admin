import http from 'plugins/axios';

class SettingsService {
  async getBulkTransferProviders() {
    try {
      const { data } = await http.get('/api/settings/bulkTransferProviders');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async toggleProviderStatus(providerId) {
    try {
      const { data } = await http.put(`/api/settings/bulkTransferProviders/${providerId}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const settingsService = new SettingsService();
