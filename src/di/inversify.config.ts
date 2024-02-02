import { Container } from 'inversify';
import 'reflect-metadata';

import { DI_TYPES } from './DI_TYPES';
import { AlertNotification } from '../secondaryAdapters/NotificationAdapter';
import { ApiClient } from '../secondaryAdapters/ApiClientAdapter';
import { Payment } from '../secondaryAdapters/PaymentAdapter';
import { OrderAppService } from '../core/application/services/OrderAppService';
import { AuthAppService } from '../core/application/services/AuthAppService';
import { CartAppService } from '../core/application/services/CartAppService';

const diContainer = new Container();

// interfaces implementation bindings:
diContainer.bind(DI_TYPES.NotificationPort).to(AlertNotification);
diContainer.bind(DI_TYPES.ApiClientPort).to(ApiClient);
diContainer.bind(DI_TYPES.PaymentPort).to(Payment);

// self - classes:
diContainer.bind(OrderAppService).toSelf().inSingletonScope();
diContainer.bind(AuthAppService).toSelf().inSingletonScope();
diContainer.bind(CartAppService).toSelf().inSingletonScope();

export { diContainer };
