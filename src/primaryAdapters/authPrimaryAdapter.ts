import { diContainer } from 'di/inversify.config';
import { DI_TYPES } from 'di/DI_TYPES';

import { AuthInputPort } from '../core/application/inputPorts';
import { User, UserName } from '../core/domain/model';

interface AuthPrimaryAdapter {
  authenticate: (name: UserName, email: Email) => Promise<User>;
}
export function useAuthPrimaryAdapter(): AuthPrimaryAdapter {
  const authAppService = <AuthInputPort>diContainer.get(DI_TYPES.AuthInputPort);

  return {
    // Ideally, we would pass a command as an argument, which would encapsulate all input data.
    // todo: command???
    authenticate: async (name: UserName, email: Email) => authAppService.auth(name, email),
  };
}
