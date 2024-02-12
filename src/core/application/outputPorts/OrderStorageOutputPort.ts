import { Order } from '../../domain/model';

export interface OrderStorageOutputPort {
  getOrders(): Order[];
  addOrder(order: Order): void;
}
