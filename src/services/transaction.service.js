import { PER_PAGE } from 'constants/pagination';
import http from 'plugins/axios';
import { isGcAdmin } from 'utils/getUserRole';
class TransactionService {
  async getTransactionPerOrganization(params) {
    try {
      const { data } = await http.get('/api/requests/all', {
        params: { ...params, perPage: PER_PAGE }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getTransactionById(id) {
    try {
      const { data } = await http.get(`/api/requests/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllTransactions(params) {
    let url = '/api/requests/backoffice/transfer-requests/all';
    if (isGcAdmin()) {
      url = '/api/gcadmin/transferRequest';
    }
    try {
      const { data } = await http.get(url, {
        params: { ...params, perPage: PER_PAGE }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const transactionService = new TransactionService();
