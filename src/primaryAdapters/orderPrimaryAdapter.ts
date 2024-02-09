import { useState } from 'react';
import { diContainer } from 'di/inversify.config';

import { OrderAppService } from '../core/application/services/OrderAppService';
import { User } from '../core/domain/model/User';
import { Cart } from '../core/domain/model/Cart';
import { Order } from '../core/domain/model/Order';

interface OrderPrimaryAdapter {
  orders: Order[];
  orderProducts: (user: User, cart: Cart) => Promise<Order | void>;
}
export function useOrderPrimaryAdapter(): OrderPrimaryAdapter {
  const orderAppService = diContainer.get(OrderAppService);
  const [orders, setOrders] = useState(orderAppService.getOrders());

  orderAppService.subscribe(() => {
    setOrders(orderAppService.getOrders());
  });

  // todo:
  // We can also get `user` and `cart` right here through the corresponding hooks
  // and not pass them as arguments to a function.
  // todo: command
  // Ideally, we would pass a command as an argument,
  // which would encapsulate all input data.

  return {
    orders,
    orderProducts: (user: User, cart: Cart) => orderAppService.makeOrder(user, cart),
  };
}
