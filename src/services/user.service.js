import { PER_PAGE } from 'constants/pagination';
import http from 'plugins/axios';
import { notification } from 'utils';
import { isGcAdmin } from 'utils/getUserRole';

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
        params: { ...params, perPage: PER_PAGE }
      });
      return response?.data;
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

  async getAllUsers(params) {
    let url = '/api/users/all';
    if (isGcAdmin()) {
      url = '/api/gcadmin/fetchAllusers';
    }
    try {
      const response = await http.get(url, { params: { ...params, perPage: PER_PAGE } });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async enableUser({ id, otp }) {
    try {
      const data = await http.patch(`/api/users/enable/${id}`, { otp });
      notification('User Enabled Successfully');
      return data;
    } catch (error) {
      notification(error.response.data.message, 'error');
      throw new Error(error);
    }
  }

  async disableUser({ id, otp }) {
    try {
      const data = await http.patch(`/api/users/disable/${id}`, { otp });
      notification('User Disabled Successfully');
      return data;
    } catch (error) {
      if (error?.response?.status !== 422) {
        notification(error.response.data.message, 'error');
      }
      throw error.response;
    }
  }

  async switchUsers(payload) {
    try {
      const response = await http.patch('/api/mandate/updateMandateAuthorizerVerifiers', payload);
      notification(response?.message);
      return response;
    } catch (error) {
      notification(error.response.data.message, 'error');
      throw new Error(error);
    }
  }

  async updateUserEmail(payload) {
    try {
      const response = await http.patch('/api/users/editEmail', payload);
      notification('Email Updated Successfully');
      return response;
    } catch (error) {
      notification(error.response.data.message, 'error');
      throw new Error(error);
    }
  }
}

export const userService = new UserService();
