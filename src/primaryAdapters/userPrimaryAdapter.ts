import { useState } from 'react';

import { diContainer } from 'di/inversify.config';

import { UserAppService } from '../core/application/services/UserAppService';
import { StorageAppService } from '../core/application/services/StorageAppService';
import { User } from '../core/domain/model/User';
import { Ingredient } from '../core/domain/model/Ingredient';

interface UserPrimaryAdapter {
  user: User | undefined;
  hasAllergy: (ingredient: Ingredient) => boolean;
}
export function useUserPrimaryAdapter(): UserPrimaryAdapter {
  const userAppService = diContainer.get(UserAppService);
  const storageAppService = diContainer.get(StorageAppService);

  const [user, setUser] = useState(userAppService.getUser());

  storageAppService.subscribe(() => {
    setUser(userAppService.getUser());
  });

  return {
    user,
    hasAllergy: (topping: Ingredient) => userAppService.hasAllergy(topping),
  };
}
