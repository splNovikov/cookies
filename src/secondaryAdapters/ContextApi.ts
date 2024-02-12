import { injectable } from 'inversify';

import { StorageOutputPort } from '../core/application/outputPorts';
import { storeObserver } from '../store/storeV2';

@injectable()
export class ContextApi implements StorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  subscribe(callback: () => void): void {
    return storeObserver.subscribe(callback);
  }
}
