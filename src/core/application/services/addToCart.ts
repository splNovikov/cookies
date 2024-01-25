import { User } from '../../domain/model/User';
import { Product } from '../../domain/model/Product';
import { hasAllergy } from '../../domain/services/user';
import { addProduct } from '../../domain/services/cart';
import { CartStorageService } from '../ports/storage';
import { NotificationService } from '../ports/notification';
import { useCartStorage } from '../../../primaryAdapters/storageAdapter';
import { useNotifier } from '../../../secondaryAdapters/notificationAdapter';

type UseAddToCartProps = {
  addToCart: (user: User, product: Product) => void;
};
// todo: it should return a value as response... according to paradigma
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
