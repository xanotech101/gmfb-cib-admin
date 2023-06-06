import http from 'plugins/axios';
import { notification } from 'utils';

class AccountService {
  async getAccountByAccountNo() {
    try {
      const { data } = await http.get('/api/bank/balance');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTransactionHistory() {
    try {
      const { data } = await http.get('/api/bank/history');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAccountInfo(accountNumber) {
    try {
      const response = await http.get(`/api/bank/getaccount2/${accountNumber}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message?.Message ?? 'Unable to get account details');
    }
  }

  async getNameEnquiry(payload) {
    try {
      const { data } = await http.post('/api/bank/name-enquiry', payload);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllAccounts(params, isSystemAdmin) {
    const url = isSystemAdmin
      ? '/api/account/all_accounts'
      : '/api/gcadmin/getAccount_oragnizationlabel/gc-admin';
    try {
      const { data } = await http.get(url, { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAccount(id) {
    try {
      const { data } = await http.get(`/api/account/all_accounts/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async onBoardCorporateAccount(payload) {
    try {
      const { data } = await http.post('/api/account/register', payload);
      notification(data?.message ?? 'Account created successfully');
      return data;
    } catch (error) {
      notification(error.response.data.Message, 'error');
      throw new Error(error);
    }
  }

  async verifyAccount(token) {
    try {
      const response = await http.post(`/api/account/verify-account/${token}`);
      return response.data;
    } catch (error) {
      notification(error.response.data.message ?? 'Something went wrong', 'error');
      throw new Error(error);
    }
  }

  async getCustomerInfo(customerId) {
    try {
      const data = await http.get(`/api/bank/detail/${customerId}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAccountLabels() {
    try {
      const { data } = await http.get('/api/organization/all');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async bulkUploadAccount({ file, organizationLabel }) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('organizationLabel', organizationLabel);
    try {
      const data = await http.post('/api/account/bulkOnboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      notification(data?.message ?? '');
      return data;
    } catch (error) {
      notification(error?.response?.data?.message, 'error');
      throw new Error(error);
    }
  }
}

export const accountService = new AccountService();
