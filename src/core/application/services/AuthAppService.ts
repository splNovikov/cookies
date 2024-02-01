import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { User, UserName } from '../../domain/model/User';
// todo: PORTS? should them be used in application-services?
import { UserStorageService } from '../ports/storage';
import { ApiClientService } from '../ports/apiClient';

// todo: DI?
type DIDependencies = {
  storage: UserStorageService;
};

@injectable()
export class AuthAppService {
  @inject(DI_TYPES.ApiClientService)
  private apiClient!: ApiClientService;

  // todo constructor injections are still not working!!!
  // constructor() {}

  async auth(name: UserName, email: Email, { storage }: DIDependencies): Promise<User> {
    const user = await this.apiClient.auth(name, email);
    storage.updateUser(user);

    return user;
  }
}
