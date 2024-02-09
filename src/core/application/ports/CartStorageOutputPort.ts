import { Cart } from '../../domain/model/Cart';

export interface CartStorageOutputPort {
  subscribe(callback: () => void): void;
  getCart(): Cart;
  updateCart(cart: Cart): void;
  emptyCart(): void;
}
