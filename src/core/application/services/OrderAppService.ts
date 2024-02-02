import { inject, injectable } from 'inversify';

import { DI_TYPES } from 'di/DI_TYPES';
import { createOrder } from '../../domain/services/order';
import { User } from '../../domain/model/User';
import { Cart } from '../../domain/model/Cart';
import { Order } from '../../domain/model/Order';
import { totalPrice } from './totalPrice';
// todo: PORTS? should them be used in application-services?
import { NotificationPort } from '../ports/NotificationPort';
import { PaymentPort } from '../ports/PaymentPort';
import { CartStorageService, OrdersStorageService } from '../ports/storage';

// todo: DI?
type DIDependencies = {
  orderStorage: OrdersStorageService;
  cartStorage: CartStorageService;
};

@injectable()
export class OrderAppService {
  @inject(DI_TYPES.NotificationPort)
  private notifier!: NotificationPort;

  @inject(DI_TYPES.PaymentPort)
  private payment!: PaymentPort;

  // todo constructor injections still not working!!!
  // constructor() {}

  async makeOrder(user: User, cart: Cart, { orderStorage, cartStorage }: DIDependencies): Promise<Order | void> {
    // Here we can validate the data before creating the order.

    // todo: I am not quite sure if this is the best way to do totalPrice here...
    const total = totalPrice(cart.products);
    const order = createOrder(user, cart, total);

    // The use case function doesn't call third-party services directly,
    // instead, it relies on the interfaces we declared earlier.
    const paid = await this.payment.tryPay(order.total);
    if (!paid) return this.notifier.notify("The payment wasn't successful 🤷");

    // And here we can save the order on the server, if necessary.

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();

    return order;
  }
}
