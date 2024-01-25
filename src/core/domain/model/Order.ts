import { Cart } from './Cart';
import { User } from './User';

export type OrderStatus = 'new' | 'delivery' | 'completed';
export class Order {
  user: UniqueId;

  cart: Cart;

  created: DateTimeString;

  status: OrderStatus;

  total: PriceCents;

  constructor(user: User, cart: Cart, status: OrderStatus, created: DateTimeString, total: PriceCents) {
    this.user = user.id;
    this.cart = cart;
    this.created = created;
    this.status = status;
    this.total = total;
  }
}
