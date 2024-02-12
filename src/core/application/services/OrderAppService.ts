import { inject, injectable } from 'inversify';

import { DI_TYPES } from 'di/DI_TYPES';
import { currentDatetime } from 'lib/datetime';
import { createOrder } from '../../domain/services/order';
import { getTotalPrice } from '../../domain/services/cart';
import { Order } from '../../domain/model/Order';
import { NotificationOutputPort } from '../ports/NotificationOutputPort';
import { PaymentOutputPort } from '../ports/PaymentOutputPort';
import { OrderStorageOutputPort } from '../ports/OrderStorageOutputPort';
import { CartStorageOutputPort } from '../ports/CartStorageOutputPort';
import { UserStorageOutputPort } from '../ports/UserStorageOutputPort';

@injectable()
export class OrderAppService {
  @inject(DI_TYPES.NotificationOutputPort)
  private notificationOutputService!: NotificationOutputPort;

  @inject(DI_TYPES.PaymentOutputPort)
  private paymentOutputService!: PaymentOutputPort;

  @inject(DI_TYPES.UserStorageOutputPort)
  private userStorageOutputService!: UserStorageOutputPort;

  @inject(DI_TYPES.OrderStorageOutputPort)
  private orderStorageOutputService!: OrderStorageOutputPort;

  @inject(DI_TYPES.CartStorageOutputPort)
  private cartStorageOutputService!: CartStorageOutputPort;

  // todo constructor injections still not working!!!
  // constructor() {}

  getOrders(): Order[] {
    return this.orderStorageOutputService.getOrders();
  }

  async makeOrder(): Promise<Order | void> {
    const user = this.userStorageOutputService.getUser();
    const cart = this.cartStorageOutputService.getCart();

    if (!user) {
      return this.notificationOutputService.notify('No user');
    }

    const total = getTotalPrice(cart);
    const created = currentDatetime();
    const order = createOrder(user, cart, created, total);

    const paid = await this.paymentOutputService.tryPay(order.total);
    if (!paid) {
      return this.notificationOutputService.notify("The payment wasn't successful 🤷");
    }

    this.orderStorageOutputService.addOrder(order);
    this.cartStorageOutputService.emptyCart();

    return order;
  }
}
