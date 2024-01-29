import { orderProducts } from '../core/application/services/order';
import { User } from '../core/domain/model/User';
import { Cart } from '../core/domain/model/Cart';
import { Order } from '../core/domain/model/Order';
import { useNotifier } from '../secondaryAdapters/notificationAdapter';
import { usePayment } from '../secondaryAdapters/paymentAdapter';
import { useCartStorage, useOrdersStorage } from '../secondaryAdapters/storageAdapter';

interface OrderPrimaryAdapter {
  orderProducts: (user: User, cart: Cart) => Promise<Order | void>;
}
export function useOrderAdapter(): OrderPrimaryAdapter {
  // Usually, we access services through Dependency Injection.
  // Here we can use hooks as a crooked “DI-container”.
  // todo: DI
  const notifier = useNotifier(); // эти хуки, это "аля" адаптеры
  const payment = usePayment();
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  // We can also get `user` and `cart` right here through the corresponding hooks
  // and not pass them as arguments to a function.

  // Ideally, we would pass a command as an argument,
  // which would encapsulate all input data.

  return {
    orderProducts: (user: User, cart: Cart) =>
      orderProducts(user, cart, { payment, orderStorage, cartStorage, notifier }),
  };
}
