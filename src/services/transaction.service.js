import http from 'plugins/axios';
import { notification } from 'utils';

class TransactionService {
  async getBankList() {
    try {
      const { data } = await http.get('/api/bank-list');
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async resolveBankAccount(payload) {
    try {
      const { data } = await http.post('/api/resolve-account', payload);
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async initiateTransaction(payload) {
    try {
      const { data } = await http.post('/api/request', payload);
      notification(data.message ?? 'Transaction initiated successfully');
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getAuthorizerTransactions() {
    try {
      const { data } = await http.get('/api/myrequests');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getAllInitiatedRequests() {
    try {
      const { data } = await http.get('/api/allrequests');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getTransactionRequests() {
    try {
      const response = await TransactionService.getAllInitiatedRequests();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getTransactionById(id) {
    try {
      const { data } = await http.get(`/api/request/${id}`);
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async declineTransactionRequest({ id, reason }) {
    try {
      const { data } = await http.post(`/api/request/${id}`, { reason });
      notification(data.message ?? 'Transaction updated successfully');
      return data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const transactionService = new TransactionService();
