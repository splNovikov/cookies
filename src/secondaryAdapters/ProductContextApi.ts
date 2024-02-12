import { injectable } from 'inversify';

import { storeObserver } from 'store';
import { Product } from '../core/domain/model';
import { ProductStorageOutputPort } from '../core/application/outputPorts';

@injectable()
export class ProductContextApi implements ProductStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getProducts(): Product[] {
    const { cookies } = storeObserver.getState();

    return cookies;
  }
}
