import { createOrder } from '../../domain/services/order';
import { User } from '../../domain/model/User';
import { Cart } from '../../domain/model/Cart';
import { Order } from '../../domain/model/Order';
import { totalPrice } from './totalPrice';
// todo: PORTS? should them be used in application-services?
import { PaymentService } from '../ports/payment';
import { CartStorageService, OrdersStorageService } from '../ports/storage';
import { NotificationService } from '../ports/notification';

// todo: DI?
type DIDependencies = {
  payment: PaymentService;
  orderStorage: OrdersStorageService;
  cartStorage: CartStorageService;
  notifier: NotificationService;
};
export async function orderProducts(
  user: User,
  cart: Cart,
  { payment, orderStorage, cartStorage, notifier }: DIDependencies,
): Promise<Order | void> {
  // Here we can validate the data before creating the order.

  // todo: I am not quite sure if this is the best way to do totalPrice here...
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

  return order;
}
