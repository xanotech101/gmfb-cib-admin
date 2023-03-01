import http from 'plugins/axios';
import { notification } from 'utils';

class TransactionService {
  async getBankList() {
    try {
      const { data } = await http.get('/api/bank-list');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async resolveBankAccount(payload) {
    try {
      const { data } = await http.post('/api/resolve-account', payload);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async initiateTransaction(payload) {
    try {
      const { data } = await http.post('/api/requests/initiate', payload);
      notification(data.message ?? 'Transaction initiated successfully');
      return data.data;
    } catch (error) {
      notification(error.response?.data?.message, 'error');
      throw new Error(error);
    }
  }
  async getAuthorizerTransactions() {
    try {
      const { data } = await http.get('/api/requests/authoriser');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllInitiatedRequests() {
    try {
      const { data } = await http.get('/api/requests/initiator');
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
      const { data } = await http.get(`/api/requests/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authorizerDeclineRequest({ id, reason, otp }) {
    try {
      const response = await http.put(`/api/requests/authoriser/decline/${id}`, { reason, otp });
      notification(response.message ?? 'Transaction declined successfully');
      return response.request;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authorizerApproveRequest({ id, reason, otp }) {
    try {
      const response = await http.put(`/api/requests/authoriser/approve/${id}`, { reason, otp });
      notification(response.message ?? 'Transaction updated successfully');
      return response.request;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifierDeclineTransaction({ id, reason, otp }) {
    try {
      const response = await http.put(`/api/requests/verifier/decline/${id}`, { reason, otp });
      notification(response.message ?? 'Transaction authorized successfully');
      return response.request;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifierApproveTransaction({ id, reason, otp }) {
    try {
      const response = await http.put(`/api/requests/verifier/approve/${id}`, { reason, otp });
      notification(response.message ?? 'Transaction authorized successfully');
      return response.request;
    } catch (error) {
      throw new Error(error);
    }
  }

  async bulkUploadTransaction(file) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const data = await http.post('/api/requests/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      notification(data?.message ?? 'Transaction initiated successfully');
      return data;
    } catch (error) {
      notification(error.message ?? 'Transaction initiated successfully', 'error');
      throw new Error(error);
    }
  }
}

export const transactionService = new TransactionService();
