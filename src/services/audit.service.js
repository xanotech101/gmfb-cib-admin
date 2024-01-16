import http from 'plugins/axios';
import { PER_PAGE } from 'constants/pagination';
import { organizationLabel } from 'utils/getUserRole';
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
    let url = '/api/audit_trails/all';
    if (organizationLabel()) {
      url = '/api/organizationLabel/audit-trails';
    }
    try {
      const { data } = await http.get(url, {
        params: { ...params, perPage: PER_PAGE }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const auditService = new AuditService();
