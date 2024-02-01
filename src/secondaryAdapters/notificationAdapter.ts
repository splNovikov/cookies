import { injectable } from 'inversify';
import { NotificationService } from '../core/application/ports/notification';

@injectable()
export class AlertNotification implements NotificationService {
  // todo: [novikov] window is also external dependency
  // eslint-disable-next-line class-methods-use-this
  notify(message: string): void {
    return window.alert(message);
  }
}
