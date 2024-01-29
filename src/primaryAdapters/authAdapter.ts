import { ApiClientService } from '../core/application/ports/apiClient';
import { UserStorageService } from '../core/application/ports/storage';
import { authenticate } from '../core/application/services/authenticate';
import { User, UserName } from '../core/domain/model/User';
import { useApiClient } from '../secondaryAdapters/apiClientAdapter';
import { useUserStorage } from '../secondaryAdapters/storageAdapter';

interface AuthPrimaryAdapter {
  user?: User;
  authenticate: (name: UserName, email: Email) => Promise<User>;
}
export function useAuthAdapter(): AuthPrimaryAdapter {
  // Usually, we access services through Dependency Injection.
  // Here we can use hooks as a crooked “DI-container”.
  // todo: DI
  // The use case function doesn't call third-party services directly,
  // instead, it relies on the interfaces we declared earlier.
  const storage: UserStorageService = useUserStorage();
  const apiClient: ApiClientService = useApiClient();

  return {
    user: storage.user,
    // Ideally, we would pass a command as an argument,
    // which would encapsulate all input data.
    // todo: command???
    authenticate: async (name: UserName, email: Email) => authenticate(name, email, { apiClient, storage }),
  };
}
