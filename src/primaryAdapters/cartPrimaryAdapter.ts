import { useState } from 'react';
import { diContainer } from 'di/inversify.config';

import { CartAppService } from '../core/application/services/CartAppService';
import { StorageAppService } from '../core/application/services/StorageAppService';
import { Product } from '../core/domain/model/Product';
import { Cart } from '../core/domain/model/Cart';

interface CartPrimaryAdapter {
  addToCart: (product: Product) => Cart;
  cart: Cart;
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
  };
}
