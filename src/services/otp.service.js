import http from 'plugins/axios';
import { notification } from 'utils';

class OtpService {
  async generateOtp(type, payload = {}) {
    let url = 'api/otp/generate';
    if (type) {
      url = `api/otp/${type}`;
    }
    try {
      const data = await http.post(url, payload);
      notification(data.message);
      return data;
    } catch (error) {
      notification(error.message ?? 'Something went wrong');
      throw new Error(error);
    }
  }
}

export const otpService = new OtpService();
