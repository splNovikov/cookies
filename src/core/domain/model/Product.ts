import { Ingredient } from './Ingredient';

export type ProductTitle = string;

export class Product {
  id: UniqueId;

  title: ProductTitle;

  price: PriceCents;

  toppings: Ingredient[];

  // Potentially, we need to overload the constructor without id
  constructor(id: UniqueId, title: ProductTitle, price: PriceCents, toppings: Ingredient[]) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.toppings = toppings;
  }
}
