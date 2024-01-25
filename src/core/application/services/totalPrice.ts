import { Product } from '../../domain/model/Product';

// todo: totalPrice импортированный из другой доменной сущности повышает зацепленность
//  Лучше делать через дополнительные компонент - адаптеры
//  Так?
export function totalPrice(products: Product[]): PriceCents {
  return products.reduce((total, { price }) => total + price, 0);
}
