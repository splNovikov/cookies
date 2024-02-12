import { injectable } from 'inversify';

import { ProductStorageOutputPort } from '../core/application/outputPorts';
import { Product } from '../core/domain/model/Product';
import { storeObserver } from '../store/storeV2';

@injectable()
export class ProductContextApi implements ProductStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getProducts(): Product[] {
    const { cookies } = storeObserver.getState();

    return cookies;
  }
}
