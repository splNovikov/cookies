import { useState } from 'react';
import { diContainer } from 'di/inversify.config';
import { DI_TYPES } from 'di/DI_TYPES';

import { CartInputPort, StorageInputPort } from '../core/application/inputPorts';
import { Cart, Product } from '../core/domain/model';

interface CartPrimaryAdapter {
  cart: Cart;
  addProduct: (product: Product) => Cart;
  containsProduct: (product: Product) => boolean;
}
export function useCartPrimaryAdapter(): CartPrimaryAdapter {
  const cartAppService = <CartInputPort>diContainer.get(DI_TYPES.CartInputPort);
  const storageAppService = <StorageInputPort>diContainer.get(DI_TYPES.StorageInputPort);

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
