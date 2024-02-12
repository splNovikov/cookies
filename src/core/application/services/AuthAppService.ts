import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { User, UserName } from '../../domain/model/User';
import { ApiClientOutputPort, UserStorageOutputPort } from '../outputPorts';

@injectable()
export class AuthAppService {
  @inject(DI_TYPES.ApiClientOutputPort)
  private apiClientOutputService!: ApiClientOutputPort;

  @inject(DI_TYPES.UserStorageOutputPort)
  private userStorageOutputService!: UserStorageOutputPort;

  // todo constructor injections are still not working!!!
  // constructor() {}

  async auth(name: UserName, email: Email): Promise<User> {
    const user = await this.apiClientOutputService.auth(name, email);

    this.userStorageOutputService.update(user);

    return user;
  }
}
