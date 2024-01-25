import { AuthenticationService } from '../core/application/ports/authentication';
import { User, UserName } from '../core/domain/model/User';
import { fakeApi } from './api';

export function useAuth(): AuthenticationService {
  return {
    auth(name: UserName, email: Email) {
      return fakeApi(new User('sample-user-id', name, email, ['cocoa', 'cherry'], ['marshmallow', 'peanuts']));
    },
  };
}
