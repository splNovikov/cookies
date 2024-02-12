import { useState } from 'react';
import { diContainer } from 'di/inversify.config';

import { OrderAppService } from '../core/application/services/OrderAppService';
import { StorageAppService } from '../core/application/services/StorageAppService';
import { User } from '../core/domain/model/User';
import { Cart } from '../core/domain/model/Cart';
import { Order } from '../core/domain/model/Order';

interface OrderPrimaryAdapter {
  orders: Order[];
  orderProducts: (user: User, cart: Cart) => Promise<Order | void>;
}
export function useOrderPrimaryAdapter(): OrderPrimaryAdapter {
  const orderAppService = diContainer.get(OrderAppService);
  const storageAppService = diContainer.get(StorageAppService);

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
