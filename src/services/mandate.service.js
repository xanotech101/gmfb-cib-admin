import http from 'plugins/axios';
import { notification } from 'utils';

const DEFAULT_MESSAGE = 'Something went wrong, please try again';
class MandateService {
  async create(payload) {
    try {
      const response = await http.post('/api/mandate/create', { ...payload });
      notification(response?.message ?? 'Mandate created successfully', 'success');
      return response.data;
    } catch (error) {
      notification(error.response.data.message ?? DEFAULT_MESSAGE, 'error');
      throw new Error(error);
    }
  }
  async update(payload) {
    try {
      const response = await http.put('/api/mandate/update', { ...payload });
      notification('Mandate updated successfully');
      return response;
    } catch (error) {
      notification(error?.response?.data?.message ?? DEFAULT_MESSAGE, 'error');
      throw new Error(error);
    }
  }
  async getAll() {
    try {
      const { data } = await http.get('/api/mandate/all');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOne(id) {
    try {
      const response = await http.get(`/api/mandate/${id}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateSwitch({ data }) {
    try {
      const response = await http.patch(`/api/mandate/updateMandateAuthorizerVerifiers`, {
        ...data
      });
      return response;
    } catch (error) {
      notification(error?.response?.data?.message);
      throw new Error(error);
    }
  }
}

export const mandateService = new MandateService();
