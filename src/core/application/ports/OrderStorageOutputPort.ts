import { Order } from '../../domain/model/Order';

export interface OrderStorageOutputPort {
  getOrders(): Order[];
  addOrder(order: Order): void;
}
