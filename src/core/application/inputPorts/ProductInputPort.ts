import { Product } from '../../domain/model';

export interface ProductInputPort {
  getProducts(): Product[];
}
