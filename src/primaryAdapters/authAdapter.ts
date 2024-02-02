import { diContainer } from 'di/inversify.config';

import { UserStorageService } from '../core/application/ports/storage';
import { AuthAppService } from '../core/application/services/AuthAppService';
import { User, UserName } from '../core/domain/model/User';
import { useUserStorage } from '../secondaryAdapters/storageAdapter';

interface AuthPrimaryAdapter {
  user?: User;
  authenticate: (name: UserName, email: Email) => Promise<User>;
}
export function useAuthAdapter(): AuthPrimaryAdapter {
  // todo: DI
  const userStorage: UserStorageService = useUserStorage();
  const aas = diContainer.get(AuthAppService);

  return {
    user: userStorage.user,
    // Ideally, we would pass a command as an argument, which would encapsulate all input data.
    // todo: command???
    authenticate: async (name: UserName, email: Email) => aas.auth(name, email, { storage: userStorage }),
  };
}
