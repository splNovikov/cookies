import { inject, injectable } from 'inversify';

import { DI_TYPES } from 'di/DI_TYPES';
import { createOrder } from '../../domain/services/order';
import { User } from '../../domain/model/User';
import { Cart } from '../../domain/model/Cart';
import { Order } from '../../domain/model/Order';
import { totalPrice } from './totalPrice';
import { NotificationOutputPort } from '../ports/NotificationOutputPort';
import { PaymentOutputPort } from '../ports/PaymentOutputPort';
import { OrderStorageOutputPort } from '../ports/OrderStorageOutputPort';
import { CartStorageOutputPort } from '../ports/CartStorageOutputPort';

@injectable()
export class OrderAppService {
  @inject(DI_TYPES.NotificationOutputPort)
  private notificationOutputService!: NotificationOutputPort;

  @inject(DI_TYPES.PaymentOutputPort)
  private paymentOutputService!: PaymentOutputPort;

  @inject(DI_TYPES.OrderStorageOutputPort)
  private orderStorageOutputService!: OrderStorageOutputPort;

  @inject(DI_TYPES.CartStorageOutputPort)
  private cartStorageOutputService!: CartStorageOutputPort;

  // todo constructor injections still not working!!!
  // constructor() {}

  getOrders(): Order[] {
    return this.orderStorageOutputService.getOrders();
  }

  async makeOrder(user: User, cart: Cart): Promise<Order | void> {
    // Here we can validate the data before creating the order.

    // todo: I am not quite sure if this is the best way to do totalPrice here...
    const total = totalPrice(cart.products);
    const order = createOrder(user, cart, total);

    const paid = await this.paymentOutputService.tryPay(order.total);
    if (!paid) {
      return this.notificationOutputService.notify("The payment wasn't successful 🤷");
    }

    const orders = this.orderStorageOutputService.getOrders();
    this.orderStorageOutputService.updateOrders([...orders, order]);
    this.cartStorageOutputService.emptyCart();

    return order;
  }
}
