import { diContainer } from 'di/inversify.config';

import { OrderAppService } from '../core/application/services/OrderAppService';
import { User } from '../core/domain/model/User';
import { Cart } from '../core/domain/model/Cart';
import { Order } from '../core/domain/model/Order';

import { useCartStorage, useOrdersStorage } from '../secondaryAdapters/storageAdapter';

interface OrderPrimaryAdapter {
  orderProducts: (user: User, cart: Cart) => Promise<Order | void>;
}
export function useOrderAdapter(): OrderPrimaryAdapter {
  // todo: DI
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  const oas = diContainer.get(OrderAppService);

  // We can also get `user` and `cart` right here through the corresponding hooks
  // and not pass them as arguments to a function.
  // todo: command
  // Ideally, we would pass a command as an argument,
  // which would encapsulate all input data.

  return {
    orderProducts: (user: User, cart: Cart) => oas.makeOrder(user, cart, { orderStorage, cartStorage }),
  };
}
