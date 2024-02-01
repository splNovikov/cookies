import { Container } from 'inversify';
import 'reflect-metadata';

import { DI_TYPES } from './DI_TYPES';
import { AlertNotification } from '../secondaryAdapters/notificationAdapter';
import { OrderAppService } from '../core/application/services/OrderAppService';

const diContainer = new Container();
diContainer.bind(DI_TYPES.NotificationService).to(AlertNotification);
diContainer.bind(OrderAppService).toSelf().inSingletonScope();

export { diContainer };
