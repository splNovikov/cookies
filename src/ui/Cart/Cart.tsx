import { ReactElement } from 'react';

import { useCartPrimaryAdapter } from '../../primaryAdapters/cartPrimaryAdapter';
import { Product } from '../../core/domain/model/Product';
import { totalPrice } from '../../core/application/services/totalPrice';

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

      <p>Total: {totalPrice(cart.products) / 100} ₽</p>
    </section>
  );
}
