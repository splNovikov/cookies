import { Product } from '../../domain/model/Product';
import { Cart } from '../../domain/model/Cart';
import { hasAllergy } from '../../domain/services/user';
import { addProduct } from '../../domain/services/cart';
// todo: PORTS? should them be used in application-services?
import { CartStorageService, UserStorageService } from '../ports/storage';
import { NotificationService } from '../ports/notification';

// todo: DI
type DIDependencies = {
  cartStorage: CartStorageService;
  userStorage: UserStorageService;
  notifier: NotificationService;
};
export function addToCart(product: Product, { cartStorage, userStorage, notifier }: DIDependencies): Cart {
  const { cart } = cartStorage;
  const { user } = userStorage;
  if (!user) {
    notifier.notify('No user!');
    return cart;
  }

  const isDangerous = product.toppings.some((ingredient) => hasAllergy(user, ingredient));

  if (isDangerous) {
    notifier.notify('This cookie is dangerous to your health!');
    return cart;
  }

  const updated = addProduct(cart, product);
  cartStorage.updateCart(updated);

  return updated;
}
