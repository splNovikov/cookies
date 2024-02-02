import { injectable } from 'inversify';
import { NotificationPort } from '../core/application/ports/NotificationPort';

@injectable()
export class AlertNotification implements NotificationPort {
  // todo: [novikov] window is also external dependency
  // eslint-disable-next-line class-methods-use-this
  notify(message: string): void {
    // eslint-disable-next-line no-alert
    return window.alert(message);
  }
}
