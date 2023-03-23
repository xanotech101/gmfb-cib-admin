import http from 'plugins/axios';
import { notification } from 'utils';

class SecurityService {
  async getSecurityQuestions() {
    try {
      const { data } = await http.get('/api/secret_questions');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createSecurityQuestions(payload) {
    try {
      const response = await http.post('/api/users/secret-questions/create', payload);
      notification(response.message ?? 'Security questions created successfully');
      return response;
    } catch (error) {
      notification(error?.response?.data?.message ?? 'Something went wrong', 'error');
      throw new Error(error);
    }
  }
}

export const securityService = new SecurityService();
