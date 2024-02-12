import { Product } from './Product';

export class Cart {
  products: Product[];

  constructor(products: Product[] = []) {
    this.products = products;
  }

  addProduct(product: Product): this {
    this.products.push(product);

    return this;
  }

  containsProduct(product: Product): boolean {
    return this.products.some(({ id }) => id === product.id);
  }

  getTotalPrice(): PriceCents {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}
