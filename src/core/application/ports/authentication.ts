import { User, UserName } from '../../domain/model/User';

export interface AuthenticationService {
  auth(name: UserName, email: Email): Promise<User>;
}
