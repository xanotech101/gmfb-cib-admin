import { notificationService } from 'services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useStore } from './useStore';
import { notification } from 'utils';

export const useNotifications = () => {
  const { data: notifications } = useQuery({
    queryKey: ['getMyNotifications'],
    queryFn: notificationService.geMyNotifications,
    onSuccess: (data) => {
      useStore.setState({ notifications: data.notifications });
    }
  });

  const deleteNotifications = useMutation({
    mutationFn: (payload) => notificationService.deleteNotifications(payload.notifications),
    onSuccess: (_, payload) => {
      const { notifications, callback } = payload;
      useStore.setState((state) => ({
        notifications: state.notifications.filter(
          (notification) => !notifications.includes(notification._id)
        )
      }));
      notification('Notifications deleted');
      callback();
    },
    onError: () => {
      notification('Unable to delete notifications, please try again', 'error');
    }
  });

  const { mutate: markNotificationsAsRead } = useMutation({
    mutationFn: (notifications) => notificationService.markNotificationsAsRead(notifications),
    onSuccess: (_, payload) => {
      useStore.setState((state) => ({
        notifications: state.notifications.map((notification) => {
          if (payload.includes(notification._id)) {
            return { ...notification, read: true };
          }
          return notification;
        })
      }));
      notification('Notifications marked as read');
    },
    onError: () => {
      notification('Something went wrong, try again', 'error');
    }
  });
  const { data: unreadNotificationsCount } = useQuery({
    queryKey: ['count'],
    queryFn: notificationService.getAllUnreadNotifications
  });
  return {
    notifications,
    deleteNotifications,
    markNotificationsAsRead,
    unreadNotificationsCount
  };
};
