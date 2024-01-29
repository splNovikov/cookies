import { User, UserName } from '../../domain/model/User';

export interface ApiClientService {
  auth: (name: UserName, email: Email) => Promise<User>;
}
