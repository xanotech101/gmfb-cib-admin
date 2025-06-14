import http from 'plugins/axios';

class NotificationService {
  async geMyNotifications() {
    try {
      const { data } = await http.get('/api/notifications/mine', {
        params: { perPage: 300 }
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteNotifications(notifications) {
    try {
      const res = await http.delete('/api/notifications', {
        data: { notifications }
      });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async markNotificationsAsRead(notifications) {
    try {
      const res = await http.put('/api/notifications', { notifications });
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllUnreadNotifications() {
    try {
      const response = await http.get('/api/notifications/unread/count');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const notificationService = new NotificationService();
