import { ReactElement } from 'react';

import { useCartPrimaryAdapter } from '../../primaryAdapters/cartPrimaryAdapter';
import { Product } from '../../core/domain/model';

import { Cookie } from '../Cookie';

import styles from './Cart.module.css';

export function Cart(): ReactElement {
  const { cart } = useCartPrimaryAdapter();

  return (
    <section>
      <h2>Cart</h2>

      <ul className={styles.list}>
        {cart.products.map((product: Product) => (
          <li key={product.id}>
            <Cookie cookie={product} />
          </li>
        ))}
      </ul>

      <p>Total: {cart.getTotalPrice() / 100} ₽</p>
    </section>
  );
}
