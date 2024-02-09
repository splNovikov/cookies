import { diContainer } from 'di/inversify.config';

import { CartAppService } from '../core/application/services/CartAppService';
import { Product } from '../core/domain/model/Product';
import { Cart } from '../core/domain/model/Cart';

interface CartPrimaryAdapter {
  addToCart: (product: Product) => Cart;
  cart: Cart;
}
export function useCartPrimaryAdapter(): CartPrimaryAdapter {
  const cartAppService = diContainer.get(CartAppService);

  return {
    cart: cartAppService.getCart(),
    addToCart: (product: Product) => cartAppService.add(product),
  };
}
