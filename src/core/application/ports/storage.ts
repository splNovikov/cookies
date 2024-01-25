import { User } from '../../domain/model/User';
import { Cart } from '../../domain/model/Cart';
import { Order } from '../../domain/model/Order';

// todo: это может быть как раз работа со стором
export interface UserStorageService {
  user?: User;
  updateUser(user: User): void;
}

// todo: это может быть как раз работа со стором
export interface CartStorageService {
  cart: Cart;
  updateCart(cart: Cart): void;
  emptyCart(): void;
}

// todo: это может быть как раз работа со стором
export interface OrdersStorageService {
  orders: Order[];
  updateOrders(orders: Order[]): void;
}
