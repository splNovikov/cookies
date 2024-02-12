import { inject, injectable } from 'inversify';

import { DI_TYPES } from 'di/DI_TYPES';

import { hasAllergy } from '../../domain/services/user';
import { addProduct, contains } from '../../domain/services/cart';
import { Cart, Product } from '../../domain/model';
import { NotificationOutputPort, UserStorageOutputPort, CartStorageOutputPort } from '../outputPorts';

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

    const isDangerous = hasAllergy(user, product.toppings);

    if (isDangerous) {
      this.notificationOutputService.notify('This cookie is dangerous to your health!');
      return cart;
    }

    const updated = addProduct(cart, product);
    this.cartStorageOutputService.updateCart(updated);

    return updated;
  }

  containsProduct(product: Product): boolean {
    const cart = this.cartStorageOutputService.getCart();

    return contains(cart, product);
  }
}
