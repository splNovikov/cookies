import { injectable } from 'inversify';
import { ApiClientPort } from '../core/application/ports/ApiClientPort';

import { User, UserName } from '../core/domain/model/User';

import { fakeApi } from './fakeApi';

@injectable()
export class ApiClient implements ApiClientPort {
  // eslint-disable-next-line class-methods-use-this
  auth(name: UserName, email: Email): Promise<User> {
    return fakeApi(new User('sample-user-id', name, email, ['cocoa', 'cherry'], ['marshmallow', 'peanuts']));
  }
}
