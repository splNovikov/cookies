import { injectable } from 'inversify';

import { NotificationOutputPort } from '../core/application/outputPorts';

@injectable()
export class AlertNotification implements NotificationOutputPort {
  // todo: [novikov] window is also external dependency
  // eslint-disable-next-line class-methods-use-this
  notify(message: string): void {
    // eslint-disable-next-line no-alert
    return window.alert(message);
  }
}
