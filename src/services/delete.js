import http from 'plugins/axios';
import { notification } from 'utils';

export const DeleteUser = async (_id) => {
  try {
    const data = http.delete(`/api/users/deleteAccount/${_id}`);
    notification('user deleted successfully');
    
  } catch (error) {
    throw new Error(error);
  }
};
