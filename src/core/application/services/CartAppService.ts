import { inject, injectable } from 'inversify';

import { DI_TYPES } from 'di/DI_TYPES';
import { hasAllergy } from '../../domain/services/user';
import { addProduct } from '../../domain/services/cart';
import { Product } from '../../domain/model/Product';
import { Cart } from '../../domain/model/Cart';
// todo: PORTS? should them be used in application-services?
import { CartStorageService, UserStorageService } from '../ports/storage';
import { NotificationService } from '../ports/notification';

// todo: DI
type DIDependencies = {
  cartStorage: CartStorageService;
  userStorage: UserStorageService;
};

@injectable()
export class CartAppService {
  @inject(DI_TYPES.NotificationService)
  private notifier!: NotificationService;

  // todo constructor injections are still not working!!!
  // constructor() {}

  add(product: Product, { cartStorage, userStorage }: DIDependencies): Cart {
    const { cart } = cartStorage;
    const { user } = userStorage;
    if (!user) {
      this.notifier.notify('No user!');
      return cart;
    }

    const isDangerous = product.toppings.some((ingredient) => hasAllergy(user, ingredient));

    if (isDangerous) {
      this.notifier.notify('This cookie is dangerous to your health!');
      return cart;
    }

    const updated = addProduct(cart, product);

    // we should update a link to the object to trigger Store update...
    // todo: can we fix it and do it more smoothly?
    cartStorage.updateCart(new Cart(updated.products));

    return updated;
  }
}
