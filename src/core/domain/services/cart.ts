import { Cart } from '../model/Cart';
import { Product } from '../model/Product';

export function addProduct(cart: Cart, product: Product): Cart {
  return cart.addProduct(product);
}

export function contains(cart: Cart, product: Product): boolean {
  return cart.containsProduct(product);
}
