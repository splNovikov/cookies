import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { Product } from '../../domain/model';
import { ProductStorageOutputPort } from '../outputPorts';

@injectable()
export class ProductAppService {
  @inject(DI_TYPES.ProductStorageOutputPort)
  private productStorageOutputService!: ProductStorageOutputPort;

  // todo constructor injections are still not working!!!
  // constructor() {}

  getProducts(): Product[] {
    return this.productStorageOutputService.getProducts();
  }
}
