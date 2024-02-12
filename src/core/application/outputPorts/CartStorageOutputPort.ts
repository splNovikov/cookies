import { Cart } from '../../domain/model';

export interface CartStorageOutputPort {
  getCart(): Cart;
  updateCart(cart: Cart): void;
  emptyCart(): void;
}
