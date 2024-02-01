import { CartStorageService, UserStorageService } from '../core/application/ports/storage';
// import { NotificationService } from '../core/application/ports/notification';
import { addToCart } from '../core/application/services/addToCart';
import { Product } from '../core/domain/model/Product';
import { Cart } from '../core/domain/model/Cart';
import { useCartStorage, useUserStorage } from '../secondaryAdapters/storageAdapter';
// import { useNotifier } from '../secondaryAdapters/notificationAdapter';

interface CartPrimaryAdapter {
  addToCart: (product: Product) => Cart;
}
export function useCartAdapter(): CartPrimaryAdapter {
  // Usually, we access services through Dependency Injection.
  // Here we can use hooks as a crooked “DI-container”.
  // todo: DI
  const cartStorage: CartStorageService = useCartStorage();
  const userStorage: UserStorageService = useUserStorage();
  // todo:
  // const notifier: NotificationService = useNotifier();

  return { addToCart: (product: Product) => addToCart(product, { cartStorage, userStorage }) };
}
