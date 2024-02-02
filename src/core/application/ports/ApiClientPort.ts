import { User, UserName } from '../../domain/model/User';

export interface ApiClientPort {
  auth: (name: UserName, email: Email) => Promise<User>;
}
