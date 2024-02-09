import { User, UserName } from '../../domain/model/User';

export interface ApiClientOutputPort {
  auth: (name: UserName, email: Email) => Promise<User>;
}
