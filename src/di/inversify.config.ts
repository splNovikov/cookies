import { Container } from 'inversify';
import 'reflect-metadata';
import { DI_TYPES } from 'di/DI_TYPES';

import { AuthAppService } from '../core/application/services/AuthAppService';
import { OrderAppService } from '../core/application/services/OrderAppService';
import { CartAppService } from '../core/application/services/CartAppService';
import { UserAppService } from '../core/application/services/UserAppService';
import { ProductAppService } from '../core/application/services/ProductAppService';
import { StorageAppService } from '../core/application/services/StorageAppService';

import { AlertNotification } from '../secondaryAdapters/AlertNotification';
import { ApiClient } from '../secondaryAdapters/ApiClient';
import { Payment } from '../secondaryAdapters/Payment';
import { UserContextApi } from '../secondaryAdapters/UserContextApi';
import { OrderContextApi } from '../secondaryAdapters/OrderContextApi';
import { CartContextApi } from '../secondaryAdapters/CartContextApi';
import { ProductContextApi } from '../secondaryAdapters/ProductContextApi';
import { ContextApi } from '../secondaryAdapters/ContextApi';

const diContainer = new Container();

// interfaces implementation bindings:
diContainer.bind(DI_TYPES.AuthInputPort).to(AuthAppService);
diContainer.bind(DI_TYPES.CartInputPort).to(CartAppService);
diContainer.bind(StorageAppService).toSelf().inSingletonScope();
diContainer.bind(OrderAppService).toSelf().inSingletonScope();
diContainer.bind(UserAppService).toSelf().inSingletonScope();
diContainer.bind(ProductAppService).toSelf().inSingletonScope();

diContainer.bind(DI_TYPES.NotificationOutputPort).to(AlertNotification);
diContainer.bind(DI_TYPES.ApiClientOutputPort).to(ApiClient);
diContainer.bind(DI_TYPES.PaymentOutputPort).to(Payment);
diContainer.bind(DI_TYPES.StorageOutputPort).to(ContextApi);
diContainer.bind(DI_TYPES.UserStorageOutputPort).to(UserContextApi);
diContainer.bind(DI_TYPES.OrderStorageOutputPort).to(OrderContextApi);
diContainer.bind(DI_TYPES.CartStorageOutputPort).to(CartContextApi);
diContainer.bind(DI_TYPES.ProductStorageOutputPort).to(ProductContextApi);

export { diContainer };
