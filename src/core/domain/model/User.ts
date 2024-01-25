import { Ingredient } from './Ingredient';
import { hasAllergy } from '../services/user';

export type UserName = string;
export class User {
  id: UniqueId;

  name: UserName;

  email: Email;

  preferences: Ingredient[];

  allergies: Ingredient[];

  constructor(id: UniqueId, name: UserName, email: Email, allergies: Ingredient[], preferences: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.preferences = preferences;
    this.allergies = allergies;
  }

  hasAllergy(ingredient: Ingredient): boolean {
    return this.allergies.includes(ingredient);
  }

  hasPreference(ingredient: Ingredient): boolean {
    return this.preferences.includes(ingredient);
  }
}
