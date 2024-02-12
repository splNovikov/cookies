import { injectable } from 'inversify';

import { storeObserver } from 'store';
import { User } from '../core/domain/model';
import { UserStorageOutputPort } from '../core/application/outputPorts';

@injectable()
export class UserContextApi implements UserStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  getUser(): User | undefined {
    const { user } = storeObserver.getState();

    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  update(user: User): void {
    storeObserver.setState((state) => ({ ...state, user }));
  }
}
