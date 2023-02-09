import http from 'plugins/axios';

class UserService {
  async getProfile() {
    try {
      const { data } = await http.get('/api/users/profile');
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getBranchUsers() {
    try {
      const response = await http.get('/api/allbranchusers');
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userService = new UserService();
