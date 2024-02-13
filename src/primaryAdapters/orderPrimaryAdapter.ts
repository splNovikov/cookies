import { useState } from 'react';
import { diContainer } from 'di/inversify.config';
import { DI_TYPES } from 'di/DI_TYPES';

import { OrderInputPort, StorageInputPort } from '../core/application/inputPorts';
import { Cart, Order, User } from '../core/domain/model';

interface OrderPrimaryAdapter {
  orders: Order[];
  orderProducts: (user: User, cart: Cart) => Promise<Order | void>;
}
export function useOrderPrimaryAdapter(): OrderPrimaryAdapter {
  const orderAppService = <OrderInputPort>diContainer.get(DI_TYPES.OrderInputPort);
  const storageAppService = <StorageInputPort>diContainer.get(DI_TYPES.StorageInputPort);

  const [orders, setOrders] = useState(orderAppService.getOrders());

  storageAppService.subscribe(() => {
    setOrders(orderAppService.getOrders());
  });

  // todo: command
  // Ideally, we would pass a command as an argument,
  // which would encapsulate all input data.

  return {
    orders,
    orderProducts: () => orderAppService.makeOrder(),
  };
}
