import { useState } from 'react';

import { diContainer } from 'di/inversify.config';

import { UserAppService } from '../core/application/services/UserAppService';
import { User } from '../core/domain/model/User';

interface UserPrimaryAdapter {
  user: User | undefined;
}
export function useUserPrimaryAdapter(): UserPrimaryAdapter {
  const userAppService = diContainer.get(UserAppService);
  // const [user, setUser] = useState(userAppService.getUser());
  //
  // userAppService.subscribe(() => {
  //   setUser(userAppService.getUser());
  // });

  return { user: userAppService.getUser() };
}
