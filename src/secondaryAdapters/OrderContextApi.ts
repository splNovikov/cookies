import { injectable } from 'inversify';

import { OrderStorageOutputPort } from '../core/application/ports/OrderStorageOutputPort';
import { Order } from '../core/domain/model/Order';
import { storeObserver } from '../store/storeV2';

@injectable()
export class OrderContextApi implements OrderStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getOrders(): Order[] {
    const { orders } = storeObserver.getState();

    return orders;
  }

  // eslint-disable-next-line class-methods-use-this
  addOrder(order: Order): void {
    storeObserver.setState((state) => ({ ...state, orders: [...state.orders, order] }));
  }
}
