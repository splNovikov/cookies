import { createOrder } from '../../domain/services/order';
import { User } from '../../domain/model/User';
import { Cart } from '../../domain/model/Cart';
import { totalPrice } from './totalPrice';
import { useNotifier } from '../../../secondaryAdapters/notificationAdapter';
import { usePayment } from '../../../secondaryAdapters/paymentAdapter';
import { useCartStorage, useOrdersStorage } from '../../../primaryAdapters/storageAdapter';

type UseOrderProductsProps = {
  orderProducts: (user: User, cart: Cart) => Promise<void>;
};
// Note that the port interfaces are in the _application layer_,
// but their implementation is in the _adapter_ layer.
export function useOrderProducts(): Readonly<UseOrderProductsProps> {
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
  // eslint-disable-next-line consistent-return
  async function orderProducts(user: User, cart: Cart): Promise<void> {
    // Here we can validate the data before creating the order.

    // todo: I am not quite sure if this is the best way to do it here...
    const total = totalPrice(cart.products);
    const order = createOrder(user, cart, total);

    // The use case function doesn't call third-party services directly,
    // instead, it relies on the interfaces we declared earlier.
    const paid = await payment.tryPay(order.total);
    if (!paid) return notifier.notify("The payment wasn't successful 🤷");

    // And here we can save the order on the server, if necessary.

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}
