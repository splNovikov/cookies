import { useState } from 'react';
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
  const [cart, setCart] = useState(cartAppService.getCart());

  cartAppService.subscribe(() => {
    setCart(cartAppService.getCart());
  });

  return {
    cart,
    addToCart: (product: Product) => cartAppService.add(product),
  };
}
