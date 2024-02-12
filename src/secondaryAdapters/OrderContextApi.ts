import { injectable } from 'inversify';

import { storeObserver } from 'store';
import { Order } from '../core/domain/model';
import { OrderStorageOutputPort } from '../core/application/outputPorts';

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
