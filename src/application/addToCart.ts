import { Product } from '../domain/product';
import { hasAllergy, User } from '../domain/user';
import { addProduct } from '../domain/cart';

import { CartStorageService, NotificationService } from './ports';
import { useCartStorage } from '../services/storageAdapter';
import { useNotifier } from '../services/notificationAdapter';

type UseAddToCartProps = {
  addToCart: (user: User, product: Product) => void;
};
export function useAddToCart(): Readonly<UseAddToCartProps> {
  const storage: CartStorageService = useCartStorage();
  const notifier: NotificationService = useNotifier();

  // eslint-disable-next-line consistent-return
  function addToCart(user: User, product: Product): void {
    const warning = 'This cookie is dangerous to your health! 😱';
    const isDangerous = product.toppings.some((item) => hasAllergy(user, item));
    if (isDangerous) return notifier.notify(warning);

    const { cart } = storage;
    const updated = addProduct(cart, product);
    storage.updateCart(updated);
  }

  return { addToCart };
}
