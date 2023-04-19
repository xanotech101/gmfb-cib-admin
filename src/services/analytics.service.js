import http from 'plugins/axios';

class AnalyticsService {
  async getAnalysis(year) {
    try {
      const { data } = await http.get(`/api/requests/analysis/backoffice/${year}`);
      return data;
    } catch (error) {
      // notification(error?.response?.data?.message ?? 'Something went wrong', 'error');
      throw new Error(error);
    }
  }
  async getDashboardAnalysis() {
    try {
      const { data } = await http.get(`/api/requests/analysis/backoffice/dashboard`);
      return data;
    } catch (error) {
      // notification(error?.response?.data?.message ?? 'Something went wrong', 'error');
      throw new Error(error);
    }
  }
}

export const analyticsService = new AnalyticsService();
