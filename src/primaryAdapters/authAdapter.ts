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
  // Usually, we access services through Dependency Injection.
  // Here we can use hooks as a crooked “DI-container”.
  // todo: DI
  const storage: UserStorageService = useUserStorage();
  const aas = diContainer.get(AuthAppService);

  return {
    user: storage.user,
    // Ideally, we would pass a command as an argument,
    // which would encapsulate all input data.
    // todo: command???
    authenticate: async (name: UserName, email: Email) => aas.auth(name, email, { storage }),
  };
}
