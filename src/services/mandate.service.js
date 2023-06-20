import http from 'plugins/axios';

class MandateService {
  async getAll(params) {
    try {
      const { data } = await http.get('/api/mandate/all', { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const mandateService = new MandateService();
