import http from 'plugins/axios';

class AccountService {
  async getAccountByAccountNo() {
    try {
      const { data } = await http.get('/api/account/balance');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getTransactionHistory() {
    try {
      const { data } = await http.get('/api/account/history');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAccountInfo() {
    try {
      const { data } = await http.get('/api/account/info');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNameEnquiry(payload) {
    try {
      const { data } = await http.post('/api/account/name-enquiry', payload);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const accountService = new AccountService();
