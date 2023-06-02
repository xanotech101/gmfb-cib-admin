import http from 'plugins/axios';
import { notification } from 'utils';

class UserService {
  async getProfile() {
    try {
      const { data } = await http.get('/api/users/profile');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBranchUsers(params) {
    try {
      const response = await http.get('/api/users/allbranchusers', {
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCorporateUser(data) {
    try {
      const response = await http.post('/api/auth/register', data);
      notification('User created successfully');
      return response.data;
    } catch (error) {
      notification(error.response.data.message ?? 'something went wrong', 'error');
      throw new Error(error);
    }
  }

  async getAllUsers(params, isSystemAdmin) {
    const url = isSystemAdmin ? '/api/users/all' : '/api/gcadmin/fetchAllusers';
    try {
      const response = await http.get(url, {
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userService = new UserService();
