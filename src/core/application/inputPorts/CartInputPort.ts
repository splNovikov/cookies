import { Cart, Product } from '../../domain/model';

export interface CartInputPort {
  getCart(): Cart;
  addProduct(product: Product): Cart;
  containsProduct(product: Product): boolean;
}
