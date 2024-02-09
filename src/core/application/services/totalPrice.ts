import { Product } from '../../domain/model/Product';

//  todo: It should be implemented via additional component-adapters
//  todo: Like this?
export function totalPrice(products: Product[]): PriceCents {
  return products.reduce((total, { price }) => total + price, 0);
}
