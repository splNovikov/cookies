import { Order } from '../../domain/model/Order';

export interface OrderStorageOutputPort {
  getOrders(): Order[];
  updateOrders(orders: Order[]): void;
}
