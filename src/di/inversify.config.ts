import { Container } from 'inversify';
import 'reflect-metadata';

import { DI_TYPES } from './DI_TYPES';

import { AlertNotification } from '../secondaryAdapters/AlertNotification';
import { ApiClient } from '../secondaryAdapters/ApiClient';
import { Payment } from '../secondaryAdapters/Payment';
import { UserContextApi } from '../secondaryAdapters/UserContextApi';
import { OrderContextApi } from '../secondaryAdapters/OrderContextApi';
import { CartContextApi } from '../secondaryAdapters/CartContextApi';
import { ProductContextApi } from '../secondaryAdapters/ProductContextApi';

import { OrderAppService } from '../core/application/services/OrderAppService';
import { AuthAppService } from '../core/application/services/AuthAppService';
import { CartAppService } from '../core/application/services/CartAppService';
import { UserAppService } from '../core/application/services/UserAppService';
import { ProductAppService } from '../core/application/services/ProductAppService';

const diContainer = new Container();

// interfaces implementation bindings:
diContainer.bind(DI_TYPES.NotificationOutputPort).to(AlertNotification);
diContainer.bind(DI_TYPES.ApiClientOutputPort).to(ApiClient);
diContainer.bind(DI_TYPES.PaymentOutputPort).to(Payment);
diContainer.bind(DI_TYPES.UserStorageOutputPort).to(UserContextApi);
diContainer.bind(DI_TYPES.OrderStorageOutputPort).to(OrderContextApi);
diContainer.bind(DI_TYPES.CartStorageOutputPort).to(CartContextApi);
diContainer.bind(DI_TYPES.ProductStorageOutputPort).to(ProductContextApi);

// self - classes:
// todo: should have own interface as InputPort. Should it? Why? Just to be? AppServices should not be "inversify able"
diContainer.bind(OrderAppService).toSelf().inSingletonScope();
diContainer.bind(AuthAppService).toSelf().inSingletonScope();
diContainer.bind(CartAppService).toSelf().inSingletonScope();
diContainer.bind(UserAppService).toSelf().inSingletonScope();
diContainer.bind(ProductAppService).toSelf().inSingletonScope();

export { diContainer };
