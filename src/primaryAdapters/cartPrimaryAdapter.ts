import { useState } from 'react';
import { diContainer } from 'di/inversify.config';

import { CartAppService } from '../core/application/services/CartAppService';
import { StorageAppService } from '../core/application/services/StorageAppService';
import { Cart, Product } from '../core/domain/model';

interface CartPrimaryAdapter {
  cart: Cart;
  addToCart: (product: Product) => Cart;
  containsProduct: (product: Product) => boolean;
}
export function useCartPrimaryAdapter(): CartPrimaryAdapter {
  const cartAppService = diContainer.get(CartAppService);
  const storageAppService = diContainer.get(StorageAppService);

  const [cart, setCart] = useState(cartAppService.getCart());

  storageAppService.subscribe(() => {
    setCart(cartAppService.getCart());
  });

  return {
    cart,
    addToCart: (product: Product) => cartAppService.add(product),
    containsProduct: (product: Product) => cartAppService.containsProduct(product),
  };
}
