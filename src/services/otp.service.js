import http from 'plugins/axios';
import { notification } from 'utils';

class OtpService {
  async generateOtp(payload) {
    try {
      const data = await http.post('/api/otp/generate', payload);
      notification(data.message);
      return data;
    } catch (error) {
      notification(error.message ?? 'Something went wrong');
      throw new Error(error);
    }
  }
  async regenerateOtp(payload) {
    try {
      const data = await http.post('/api/otp/regenerate', payload);
      notification(data.message);
      return data;
    } catch (error) {
      notification(error.message ?? 'Something went wrong');
      throw new Error(error);
    }
  }
}

export const otpService = new OtpService();
