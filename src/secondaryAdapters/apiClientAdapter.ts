import { ApiClientService } from '../core/application/ports/apiClient';

import { User, UserName } from '../core/domain/model/User';

import { fakeApi } from './api';

export function useApiClient(): ApiClientService {
  return {
    auth(name: UserName, email: Email) {
      return fakeApi(new User('sample-user-id', name, email, ['cocoa', 'cherry'], ['marshmallow', 'peanuts']));
    },
  };
}
