import http from 'plugins/axios';
import { isGcAdmin } from 'utils/getUserRole';

class AnalyticsService {
  async getAnalysis(year) {
    let url = `/api/requests/analysis/backoffice/${year}`;
    if (isGcAdmin()) {
      url = `/api/gcadmin/analytics/${year}`;
    }
    try {
      const { data } = await http.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getDashboardAnalysis() {
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
