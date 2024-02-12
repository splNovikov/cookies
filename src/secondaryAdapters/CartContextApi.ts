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
    // todo: new Cart??? so, why do we need addProduct in Cart class then???
    //  except the place where we use addProduct in CartAppService
    storeObserver.setState((state) => ({ ...state, cart: new Cart(cart.products) }));

    return cart;
  }

  // eslint-disable-next-line class-methods-use-this
  emptyCart(): void {
    storeObserver.setState((state) => ({ ...state, cart: new Cart([]) }));
  }
}
