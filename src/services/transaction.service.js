import http from 'plugins/axios';

class TransactionService {
  async getTransactionPerOrganization(params) {
    try {
      const { data } = await http.get('/api/requests/all', {
        params
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
    try {
      const { data } = await http.get('/api/requests/backoffice/transfer-requests/all', {
        params
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const transactionService = new TransactionService();
