import { diContainer } from 'di/inversify.config';

import { AuthAppService } from '../core/application/services/AuthAppService';
import { User, UserName } from '../core/domain/model';

interface AuthPrimaryAdapter {
  authenticate: (name: UserName, email: Email) => Promise<User>;
}
export function useAuthPrimaryAdapter(): AuthPrimaryAdapter {
  const authAppService = diContainer.get(AuthAppService);

  return {
    // Ideally, we would pass a command as an argument, which would encapsulate all input data.
    // todo: command???
    authenticate: async (name: UserName, email: Email) => authAppService.auth(name, email),
  };
}
