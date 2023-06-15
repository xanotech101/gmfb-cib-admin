import http from 'plugins/axios';
import { notification } from 'utils';

class OtpService {
  async generateOtp(type) {
    try {
      const data = await http.post(`api/otp/${type}`);
      notification(data.message);
      return data;
    } catch (error) {
      notification(error.message ?? 'Something went wrong');
      throw new Error(error);
    }
  }
}

export const otpService = new OtpService();
