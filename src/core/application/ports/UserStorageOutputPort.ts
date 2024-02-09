import { User } from '../../domain/model/User';

export interface UserStorageOutputPort {
  getUser(): User | undefined;
  update(user: User): void;
}
