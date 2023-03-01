import http from 'plugins/axios';

class AuditService {
  async getOrganizationAuditTrails(params) {
    try {
      const { data } = await http.get('/api/audit_trails/organization', {
        params
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const auditService = new AuditService();
