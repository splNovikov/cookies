import { Product } from '../../domain/model/Product';

export interface ProductStorageOutputPort {
  getProducts(): Product[];
}
