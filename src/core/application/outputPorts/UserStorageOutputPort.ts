import { User } from '../../domain/model';

export interface UserStorageOutputPort {
  getUser(): User | undefined;
  update(user: User): void;
}
