import { User } from '../../domain/model/User';

export interface UserStorageOutputPort {
  subscribe(callback: () => void): void;
  getUser(): User | undefined;
  update(user: User): User;
}
