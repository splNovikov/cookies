export type Ingredient = 'chocolate' | 'peanuts' | 'cocoa' | 'marshmallow' | 'cherry';

export const ingredients: Record<Ingredient, string> = {
  chocolate: 'Chocolate',
  cocoa: 'Cocoa Powder',
  cherry: 'Cherry',
  marshmallow: 'Marshmallow',
  peanuts: 'Peanut Butter',
} as const;
