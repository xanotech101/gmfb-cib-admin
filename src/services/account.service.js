import { PER_PAGE } from 'constants/pagination';
import http from 'plugins/axios';
import { notification } from 'utils';
import { organizationLabel } from 'utils/getUserRole';

class AccountService {
  async getAccountByAccountNo(accountNo) {
    try {
      const { data } = await http.get(`/api/bank/balance/${accountNo}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTransactionHistory(accountNumber, params) {
    try {
      const { data } = await http.get(`/api/bank/history/${accountNumber}`, {
        params
      });
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

  async getAllAccounts(params) {
    let url = '/api/account/all_accounts';
    if (organizationLabel()) {
      url = '/api/organizationLabel/accounts';
    }
    try {
      const { data } = await http.get(url, { params: { ...params, perPage: PER_PAGE } });
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
      notification(error.response.data.Message ?? error?.response?.data?.message, 'error');
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
  async getAccountStatement(accountNumber, params) {
    try {
      const { message } = await http.get(`/api/bank/statement/${accountNumber}`, {
        params
      });
      return message;
    } catch (error) {
      notification(error.response.data.message, 'error');
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
  async getWhiteListedAccounts(params) {
    try {
      const { data } = await http.get('/api/users/all/whiteListedAccounts', { params });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async whiteListAccount(payload) {
    try {
      const { data } = await http.post('/api/users/whiteListAccount', payload);
      notification(data?.message ?? 'Account number whitelisted successfully');
      return data;
    } catch (error) {
      notification(error?.response?.data?.message, 'error');
      throw new Error(error);
    }
  }
  async removewhiteListedAccount(accounts) {
    try {
      const res = await http.delete('/api/users/remove/whiteListedAccounts', {
        data: { accounts }
      });
      notification(res?.message ?? 'Account number deleted successfully');
      return res;
    } catch (error) {
      notification(error?.response?.data?.message, 'error');
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

  async getAccountStats(organizationId) {
    try {
      const data = await http.get(`/api/account/stats/${organizationId}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async enableAccount({ id, otp }) {
    try {
      const data = await http.patch(`/api/account/enable/${id}`, { otp });
      notification('Account Enabled Successfully');
      return data;
    } catch (error) {
      notification(error.response.data.message, 'error');
      throw new Error(error);
    }
  }

  async disableAccount({ id, otp }) {
    try {
      const data = await http.patch(`/api/account/disable/${id}`, { otp });
      notification('Account Disabled Successfully');
      return data;
    } catch (error) {
      if (error?.response?.status !== 422) {
        notification(error.response.data.message, 'error');
      }
      throw error.response;
    }
  }
}

export const accountService = new AccountService();
