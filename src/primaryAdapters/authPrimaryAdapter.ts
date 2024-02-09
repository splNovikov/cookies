import { diContainer } from 'di/inversify.config';

import { AuthAppService } from '../core/application/services/AuthAppService';
import { UserAppService } from '../core/application/services/UserAppService';
import { User, UserName } from '../core/domain/model/User';

interface AuthPrimaryAdapter {
  user?: User;
  authenticate: (name: UserName, email: Email) => Promise<User>;
}
export function useAuthPrimaryAdapter(): AuthPrimaryAdapter {
  const userAppService = diContainer.get(UserAppService);
  const authAppService = diContainer.get(AuthAppService);

  return {
    // todo: why authAdapter returns user? It should be taken from userAdapter imho
    user: userAppService.getUser(),
    // Ideally, we would pass a command as an argument, which would encapsulate all input data.
    // todo: command???
    authenticate: async (name: UserName, email: Email) => authAppService.auth(name, email),
  };
}
