import { Order } from '../model/Order';
import { User } from '../model/User';
import { Cart } from '../model/Cart';

export function createOrder(user: User, cart: Cart, created: DateTimeString, total: PriceCents): Order {
  return new Order(user, cart, 'new', created, total);
}
