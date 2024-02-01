import { Container } from 'inversify';
import 'reflect-metadata';

import { DI_TYPES } from './DI_TYPES';
import { AlertNotification } from '../secondaryAdapters/notificationAdapter';
import { ApiClient } from '../secondaryAdapters/apiClientAdapter';
import { OrderAppService } from '../core/application/services/OrderAppService';
import { AuthAppService } from '../core/application/services/AuthAppService';
import { CartAppService } from '../core/application/services/CartAppService';

const diContainer = new Container();

// interfaces implementation bindings:
diContainer.bind(DI_TYPES.NotificationService).to(AlertNotification);
diContainer.bind(DI_TYPES.ApiClientService).to(ApiClient);

// self - classes:
diContainer.bind(OrderAppService).toSelf().inSingletonScope();
diContainer.bind(AuthAppService).toSelf().inSingletonScope();
diContainer.bind(CartAppService).toSelf().inSingletonScope();

export { diContainer };
