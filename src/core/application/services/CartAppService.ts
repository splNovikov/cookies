import { inject, injectable } from 'inversify';

import { DI_TYPES } from 'di/DI_TYPES';
import { hasAllergy } from '../../domain/services/user';
import { addProduct } from '../../domain/services/cart';
import { Product } from '../../domain/model/Product';
import { Cart } from '../../domain/model/Cart';
import { NotificationOutputPort } from '../ports/NotificationOutputPort';
import { UserStorageOutputPort } from '../ports/UserStorageOutputPort';
import { CartStorageOutputPort } from '../ports/CartStorageOutputPort';

@injectable()
export class CartAppService {
  @inject(DI_TYPES.NotificationOutputPort)
  private notificationOutputService!: NotificationOutputPort;

  @inject(DI_TYPES.UserStorageOutputPort)
  private userStorageOutputService!: UserStorageOutputPort;

  @inject(DI_TYPES.CartStorageOutputPort)
  private cartStorageOutputService!: CartStorageOutputPort;

  // todo constructor injections are still not working!!!
  // constructor() {}

  getCart(): Cart {
    return this.cartStorageOutputService.getCart();
  }

  add(product: Product): Cart {
    const cart = this.cartStorageOutputService.getCart();
    const user = this.userStorageOutputService.getUser();

    if (!user) {
      this.notificationOutputService.notify('No user!');
      return cart;
    }

    const isDangerous = product.toppings.some((ingredient) => hasAllergy(user, ingredient));

    if (isDangerous) {
      this.notificationOutputService.notify('This cookie is dangerous to your health!');
      return cart;
    }

    const updated = addProduct(cart, product);

    // we should update a link to the object to trigger Store update...
    // todo: can we fix it and do it more smoothly?
    // todo!!!
    this.cartStorageOutputService.updateCart(new Cart(updated.products));

    return updated;
  }
}
