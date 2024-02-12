import { User, UserName } from '../../domain/model';

export interface AuthInputPort {
  auth: (name: UserName, email: Email) => Promise<User>;
}
