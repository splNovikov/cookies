import { User, UserName } from '../../domain/model';

export interface ApiClientOutputPort {
  auth: (name: UserName, email: Email) => Promise<User>;
}