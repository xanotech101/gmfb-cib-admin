import http from 'plugins/axios';
import { isGcAdmin } from 'utils/getUserRole';

class AnalyticsService {
  async getAnalysis(year) {
    try {
      const { data } = await http.get(`/api/requests/analysis/backoffice/${year}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getDashboardAnalysis() {
    console.log(
      '🚀 ~ file: analytics.service.js:16 ~ AnalyticsService ~ getDashboardAnalysis ~ isGcAdmin():',
      isGcAdmin()
    );
    let url = '/api/requests/analysis/backoffice/dashboard';
    if (isGcAdmin()) {
      url = '/api/gcadmin/dashboard-analytics';
    }
    try {
      const { data } = await http.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const analyticsService = new AnalyticsService();
