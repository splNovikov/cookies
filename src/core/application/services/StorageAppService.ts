import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { StorageOutputPort } from '../outputPorts';

@injectable()
export class StorageAppService {
  @inject(DI_TYPES.StorageOutputPort)
  private storageOutputService!: StorageOutputPort;

  subscribe(callback: () => void): void {
    return this.storageOutputService.subscribe(callback);
  }
}
