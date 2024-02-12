import { Product } from '../../domain/model';

export interface ProductStorageOutputPort {
  getProducts(): Product[];
}
