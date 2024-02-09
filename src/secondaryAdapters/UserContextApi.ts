import { injectable } from 'inversify';

import { UserStorageOutputPort } from '../core/application/ports/UserStorageOutputPort';
import { User } from '../core/domain/model/User';
import { storeObserver } from '../store/storeV2';

@injectable()
export class UserContextApi implements UserStorageOutputPort {
  // eslint-disable-next-line class-methods-use-this
  subscribe(callback: () => void): void {
    return storeObserver.subscribe(callback);
  }

  // eslint-disable-next-line class-methods-use-this
  getUser(): User | undefined {
    const state = storeObserver.getState();

    return state.user;
  }

  // eslint-disable-next-line class-methods-use-this
  update(user: User): User {
    storeObserver.setState((state) => ({ ...state, user }));

    return user;
  }
}
