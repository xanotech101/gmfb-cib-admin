import http from 'plugins/axios';
import { notification } from 'utils';

export const EnableAccount = async (_id) => {
  try {
    const data = await http.patch(`/api/users/enable_user_account/${_id}
    `);
    notification('user enabled successfully');
    return data;
  } catch (error) {
    notification(error.response.data.message);
    throw new Error(error);
  }
};

export const disableAccount = async (_id, data) => {
  try {
    const response = await http.patch(
      `/api/users/disable_user_account/${_id}
      `,
      { ...data }
    );
    notification('user disabled successfully');
    console.log(response, 'data');
    return response;
  } catch (error) {
    notification(error.response.data.message);

    throw new Error(error);
  }
};

export const generateOtp = async () => {
  try {
    const data = await http.post('/api/otp/disableUserOtp');
    notification(data.message);

    return { data };
  } catch (error) {
    notification(error.message ?? 'Something went wrong');
    throw new Error(error);
  }
};
