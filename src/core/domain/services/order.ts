import { currentDatetime } from 'lib/datetime';
import { Order } from '../model/Order';
import { User } from '../model/User';
import { Cart } from '../model/Cart';

export function createOrder(user: User, cart: Cart, total: PriceCents): Order {
  const created = currentDatetime();

  return new Order(user, cart, 'new', created, total);
}
