import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { User } from '../../domain/model/User';
import { Ingredient } from '../../domain/model/Ingredient';
import { UserStorageOutputPort } from '../ports/UserStorageOutputPort';
import { hasAllergy } from '../../domain/services/user';

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

  hasAllergy(topping: Ingredient): boolean {
    const user = this.getUser();

    return user ? hasAllergy(user, topping) : false;
  }
}
