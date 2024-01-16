import { PER_PAGE } from 'constants/pagination';
import http from 'plugins/axios';

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
}

export const apiUsageService = new ApiUsageService();
