import { Cart, Product } from '../model';

export function addProduct(cart: Cart, product: Product): Cart {
  return cart.addProduct(product);
}

export function contains(cart: Cart, product: Product): boolean {
  return cart.containsProduct(product);
}

export function getTotalPrice(cart: Cart): PriceCents {
  return cart.getTotalPrice();
}
