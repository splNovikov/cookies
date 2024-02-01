import { diContainer } from 'di/inversify.config';

import { CartStorageService, UserStorageService } from '../core/application/ports/storage';
import { CartAppService } from '../core/application/services/CartAppService';
import { Product } from '../core/domain/model/Product';
import { Cart } from '../core/domain/model/Cart';
import { useCartStorage, useUserStorage } from '../secondaryAdapters/storageAdapter';

interface CartPrimaryAdapter {
  addToCart: (product: Product) => Cart;
}
export function useCartAdapter(): CartPrimaryAdapter {
  // todo: DI
  const cartStorage: CartStorageService = useCartStorage();
  const userStorage: UserStorageService = useUserStorage();

  const cas = diContainer.get(CartAppService);

  return { addToCart: (product: Product) => cas.add(product, { cartStorage, userStorage }) };
}
