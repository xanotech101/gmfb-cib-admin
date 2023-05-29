import http from 'plugins/axios';
import { notification } from 'utils';

export const DeleteUser = async (userid) => {
  try {
    await http.delete(`/api/account/deleteAccount/${userid}`);
    notification('user deleted successfully');
  } catch (error) {
    throw new Error(error);
  }
};
