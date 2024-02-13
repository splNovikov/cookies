import { Ingredient, User } from '../../domain/model';

export interface UserInputPort {
  getUser(): User | undefined;
  update(user: User): User;
  hasAllergy(topping: Ingredient): boolean;
  hasPreference(topping: Ingredient): boolean;
}
