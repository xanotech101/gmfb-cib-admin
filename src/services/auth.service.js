import http from 'plugins/axios';
import { notification } from 'utils';

class AuthService {
  async preLogin(payload) {
    try {
      const { data } = await http.post('/api/auth/pre_login', { ...payload });
      notification(data?.message ?? 'Login successful');
      return data;
    } catch (error) {
      notification(error.response.data.message, 'error');
      throw new Error(error.response.data.message);
    }
  }
  async login(payload, errorCb) {
    try {
      const { data } = await http.post('/api/auth/login', { ...payload });
      const rolesAllowed = ['system-admin', 'super-admin'];
      if (!rolesAllowed.includes(data?.user?.role)) {
        notification(`You don't have access to access this app, use the corporate portal`, 'error');
        throw new Error(`You don't have access to access this app, use the corporate portal`);
      }
      if (data?.token) {
        localStorage.setItem('token', data?.token);
        http.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
      }
      notification(data?.message ?? 'Login successful');
      return data;
    } catch (error) {
      notification(error.response.data.message, 'error');
      errorCb?.(error?.response?.data);
      throw new Error(error);
    }
  }
  async forgotPassword(email) {
    try {
      const response = await http.post('/api/auth/send_password_reset_link', {
        email
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async resetPassword(payload) {
    try {
      const response = await http.post('/api/auth/reset_password', { ...payload });
      notification(response.message);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async verifyAccount(token) {
    try {
      const response = await http.post(`/api/auth/register_confirmation/${token}`);
      return response.data;
    } catch (error) {
      notification(error.response.data.message ?? 'Something went wrong', 'error');
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
