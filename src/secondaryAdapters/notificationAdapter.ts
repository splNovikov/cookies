import { NotificationService } from '../core/application/ports/notification';

export function useNotifier(): NotificationService {
  return {
    notify: (message: string) => window.alert(message),
  };
}