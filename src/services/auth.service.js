import http from 'plugins/axios';
import { notification } from 'utils';

class AuthService {
  async login(payload) {
    try {
      const { data } = await http.post('/api/auth/login', { ...payload });
      if (data.data?.token) {
        localStorage.setItem('token', data.data?.token);
        http.defaults.headers.common['Authorization'] = `Bearer ${data.data?.token}`;
      }
      notification(data?.message ?? 'Login successful');
      return data.data;
    } catch (error) {
      notification(error.response.data.message, 'error');
      throw new Error(error);
    }
  }
  async forgotPassword(email) {
    try {
      const response = await http.post('/api/auth/send_password_reset_link', {
        email
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async resetPassword(payload) {
    try {
      const { data } = await http.post('/api/auth/reset_password', { ...payload });
      notification(data.message);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async verifyAccount(token) {
    try {
      const response = await http.post(`/api/auth/register_confirmation/${token}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async changePassword(payload) {
    try {
      const { data } = await http.post('/api/users/change-password', payload);
      notification(data.message ?? 'Password changed successfully');
      return data;
    } catch (error) {
      notification(
        error.response?.data?.message ?? 'Unable to change password, please try again',
        'error'
      );
      throw new Error(error);
    }
  }
}

export const authService = new AuthService();
