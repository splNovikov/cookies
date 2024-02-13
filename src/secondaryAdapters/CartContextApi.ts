import { injectable } from 'inversify';

import { storeObserver } from 'store';
import { Cart } from '../core/domain/model';
import { CartStorageOutputPort } from '../core/application/outputPorts';

@injectable()
export class CartContextApi implements CartStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getCart(): Cart {
    const { cart } = storeObserver.getState();

    return cart;
  }

  // eslint-disable-next-line class-methods-use-this
  updateCart(cart: Cart): Cart {
    // we do new Cart to create a new reference - to make the React determine changes
    const ref = new Cart(cart.products);

    storeObserver.setState((state) => ({ ...state, cart: ref }));

    return ref;
  }

  // eslint-disable-next-line class-methods-use-this
  emptyCart(): void {
    storeObserver.setState((state) => ({ ...state, cart: new Cart([]) }));
  }
}
