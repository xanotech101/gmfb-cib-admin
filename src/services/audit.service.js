import http from 'plugins/axios';
import { PER_PAGE } from 'constants/pagination';
class AuditService {
  async getOrganizationAuditTrails(params) {
    try {
      const { data } = await http.get('/api/audit_trails/organization', {
        params: { ...params, perPage: PER_PAGE }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllAuditTrails(params) {
    try {
      const { data } = await http.get('/api/audit_trails/all', {
        params: { ...params, perPage: PER_PAGE }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const auditService = new AuditService();
