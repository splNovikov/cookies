// todo: move this file to the corresponding place
import { Ingredient } from '../core/domain/model';

export type ProductDTO = {
  id: string;
  price: number;
  toppings: Ingredient[];
  title: string;
};
