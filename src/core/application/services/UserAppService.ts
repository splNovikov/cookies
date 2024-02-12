import { inject, injectable } from 'inversify';
import { DI_TYPES } from 'di/DI_TYPES';

import { hasAllergy, hasPreference } from '../../domain/services/user';
import { User } from '../../domain/model/User';
import { Ingredient } from '../../domain/model/Ingredient';
import { UserStorageOutputPort } from '../ports/UserStorageOutputPort';
import { NotificationOutputPort } from '../ports/NotificationOutputPort';

@injectable()
export class UserAppService {
  @inject(DI_TYPES.NotificationOutputPort)
  private notificationOutputService!: NotificationOutputPort;

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

    if (!user) {
      this.notificationOutputService.notify('No user!');

      return false;
    }

    return hasAllergy(user, topping);
  }

  hasPreference(topping: Ingredient): boolean {
    const user = this.getUser();

    if (!user) {
      this.notificationOutputService.notify('No user!');

      return false;
    }

    return hasPreference(user, topping);
  }
}
