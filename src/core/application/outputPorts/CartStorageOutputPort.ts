import { Cart } from '../../domain/model/Cart';

export interface CartStorageOutputPort {
  getCart(): Cart;
  updateCart(cart: Cart): void;
  emptyCart(): void;
}
