import { injectable } from 'inversify';
import { ApiClientService } from '../core/application/ports/apiClient';

import { User, UserName } from '../core/domain/model/User';

import { fakeApi } from './fakeApi';

@injectable()
export class ApiClient implements ApiClientService {
  // eslint-disable-next-line class-methods-use-this
  auth(name: UserName, email: Email): Promise<User> {
    return fakeApi(new User('sample-user-id', name, email, ['cocoa', 'cherry'], ['marshmallow', 'peanuts']));
  }
}
