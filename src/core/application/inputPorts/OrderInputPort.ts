import { Order } from '../../domain/model';

export interface OrderInputPort {
  getOrders(): Order[];
  makeOrder(): Promise<Order | void>;
}
