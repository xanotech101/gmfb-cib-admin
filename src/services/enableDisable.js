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
export const DisableAccount = async (_id) => {
  try {
    const data = await http.patch(`/api/users/disable_user_account/${_id}
      `);
    notification('user disabled successfully');
    return data;
  } catch (error) {
    notification(error.response.data.message);
    throw new Error(error);
  }
};
