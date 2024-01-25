import { Ingredient } from '../model/Ingredient';
import { User } from '../model/User';

export function hasAllergy(user: User, ingredient: Ingredient): boolean {
  return user.hasAllergy(ingredient);
}

export function hasPreference(user: User, ingredient: Ingredient): boolean {
  return user.hasPreference(ingredient);
}
