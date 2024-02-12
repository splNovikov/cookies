import { useState } from 'react';
import { diContainer } from 'di/inversify.config';
import { DI_TYPES } from 'di/DI_TYPES';

import { CartInputPort } from '../core/application/inputPorts';
import { StorageAppService } from '../core/application/services/StorageAppService';
import { Cart, Product } from '../core/domain/model';

interface CartPrimaryAdapter {
  cart: Cart;
  addProduct: (product: Product) => Cart;
  containsProduct: (product: Product) => boolean;
}
export function useCartPrimaryAdapter(): CartPrimaryAdapter {
  const cartAppService = <CartInputPort>diContainer.get(DI_TYPES.CartInputPort);
  const storageAppService = diContainer.get(StorageAppService);

  const [cart, setCart] = useState(cartAppService.getCart());

  storageAppService.subscribe(() => {
    setCart(cartAppService.getCart());
  });

  return {
    cart,
    addProduct: (product: Product) => cartAppService.addProduct(product),
    containsProduct: (product: Product) => cartAppService.containsProduct(product),
  };
}
