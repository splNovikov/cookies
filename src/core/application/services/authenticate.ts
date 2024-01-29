import { User, UserName } from '../../domain/model/User';
// todo: PORTS? should them be used in application-services?
import { UserStorageService } from '../ports/storage';
import { ApiClientService } from '../ports/apiClient';

// todo: DI?
type DIDependencies = {
  apiClient: ApiClientService;
  storage: UserStorageService;
};
export async function authenticate(
  name: UserName,
  email: Email,
  { apiClient, storage }: DIDependencies,
): Promise<User> {
  const user = await apiClient.auth(name, email);
  storage.updateUser(user);

  return user;
}
