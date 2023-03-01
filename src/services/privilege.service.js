import http from 'plugins/axios';

class PrivilegeService {
  async getPrivileges() {
    try {
      const { data } = await http.get('/api/privileges');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const privilegeService = new PrivilegeService();
