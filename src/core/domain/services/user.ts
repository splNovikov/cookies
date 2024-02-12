import { Ingredient } from '../model/Ingredient';
import { User } from '../model/User';

export function hasAllergy(user: User, ingredients: Ingredient | Ingredient[]): boolean {
  if (ingredients instanceof Array) {
    return ingredients.some((ingredient) => user.hasAllergy(ingredient));
  }

  return user.hasAllergy(ingredients);
}

export function hasPreference(user: User, ingredients: Ingredient | Ingredient[]): boolean {
  if (ingredients instanceof Array) {
    return ingredients.some((ingredient) => user.hasPreference(ingredient));
  }

  return user.hasPreference(ingredients);
}
