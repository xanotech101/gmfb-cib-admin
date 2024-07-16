import { PER_PAGE } from 'constants/pagination';
import http from 'plugins/axios';
import { notification } from 'utils';

class ApiUsageService {
  async getApiUsage(params) {
    try {
      const data = await http.get('/api/thirdparty/getthirdpartyOrganization', {
        params: { ...params, perPage: PER_PAGE }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getApiUsageCount(id, params) {
    try {
      const data = await http.get(`/api/thirdparty/thirdpartyAnalytics/${id}`, { ...params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async generateApiKey(payload) {
    try {
      const response = await http.patch(`/api/thirdparty/update_key`, { ...payload });
      notification(response.message);
      return response?.data;
    } catch (error) {
      notification(error.response?.data?.message, 'error');
      throw new Error(error);
    }
  }
}

export const apiUsageService = new ApiUsageService();
