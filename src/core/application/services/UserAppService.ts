import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { User } from '../../domain/model/User';
import { UserStorageOutputPort } from '../ports/UserStorageOutputPort';

@injectable()
export class UserAppService {
  @inject(DI_TYPES.UserStorageOutputPort)
  private userStorageOutputService!: UserStorageOutputPort;

  getUser(): User | undefined {
    return this.userStorageOutputService.getUser();
  }

  update(user: User): User {
    this.userStorageOutputService.update(user);

    return user;
  }
}
