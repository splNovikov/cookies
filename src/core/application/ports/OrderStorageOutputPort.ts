import { Order } from '../../domain/model/Order';

export interface OrderStorageOutputPort {
  // todo: the subscribe method should be the single one in StorageOutputPort (add it)
  subscribe(callback: () => void): void;
  getOrders(): Order[];
  updateOrders(orders: Order[]): void;
}
