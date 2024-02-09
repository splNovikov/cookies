import { injectable } from 'inversify';

import { OrderStorageOutputPort } from '../core/application/ports/OrderStorageOutputPort';
import { Order } from '../core/domain/model/Order';
import { storeObserver } from '../store/storeV2';

@injectable()
export class OrderContextApi implements OrderStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getOrders(): Order[] {
    const state = storeObserver.getState();

    return state.orders;
  }

  // eslint-disable-next-line class-methods-use-this
  updateOrders(orders: Order[]): void {
    // const state = storeObserver.getState();
    // todo: update
    // return order;
  }
}
