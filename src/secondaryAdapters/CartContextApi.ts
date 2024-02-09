import { injectable } from 'inversify';

import { CartStorageOutputPort } from '../core/application/ports/CartStorageOutputPort';
import { Cart } from '../core/domain/model/Cart';
import { storeObserver } from '../store/storeV2';

@injectable()
export class CartContextApi implements CartStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getCart(): Cart {
    const state = storeObserver.getState();

    return state.cart;
  }

  // eslint-disable-next-line class-methods-use-this
  updateCart(cart: Cart): void {
    // const state = storeObserver.getState();
    // todo: update
    // return cart;
  }

  // eslint-disable-next-line class-methods-use-this
  emptyCart(): void {
    // const state = storeObserver.getState();
    // todo: update
    // return cart;
  }
}
