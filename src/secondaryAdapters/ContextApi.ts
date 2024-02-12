import { injectable } from 'inversify';

import { storeObserver } from 'store';
import { StorageOutputPort } from '../core/application/outputPorts';

@injectable()
export class ContextApi implements StorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  subscribe(callback: () => void): void {
    return storeObserver.subscribe(callback);
  }
}
