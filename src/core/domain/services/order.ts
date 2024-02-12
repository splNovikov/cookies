import { Cart, User, Order } from '../model';

export function createOrder(user: User, cart: Cart, created: DateTimeString, total: PriceCents): Order {
  return new Order(user, cart, 'new', created, total);
}
