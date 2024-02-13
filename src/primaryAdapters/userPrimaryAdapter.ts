import { useState } from 'react';
import { diContainer } from 'di/inversify.config';
import { DI_TYPES } from 'di/DI_TYPES';

import { StorageInputPort } from '../core/application/inputPorts';
import { UserAppService } from '../core/application/services/UserAppService';
import { User, Ingredient } from '../core/domain/model';

interface UserPrimaryAdapter {
  user: User | undefined;
  hasAllergy: (ingredient: Ingredient) => boolean;
  hasPreference: (ingredient: Ingredient) => boolean;
}
export function useUserPrimaryAdapter(): UserPrimaryAdapter {
  const userAppService = diContainer.get(UserAppService);
  const storageAppService = <StorageInputPort>diContainer.get(DI_TYPES.StorageInputPort);

  const [user, setUser] = useState(userAppService.getUser());

  storageAppService.subscribe(() => {
    setUser(userAppService.getUser());
  });

  return {
    user,
    hasAllergy: (topping: Ingredient) => userAppService.hasAllergy(topping),
    hasPreference: (topping: Ingredient) => userAppService.hasPreference(topping),
  };
}
