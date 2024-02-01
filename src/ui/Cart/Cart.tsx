import { ReactElement } from 'react';
import { Cookie } from '../Cookie';
import styles from './Cart.module.css';
import { Product } from '../../core/domain/model/Product';
import { useCartStorage } from '../../secondaryAdapters/storageAdapter';
import { totalPrice } from '../../core/application/services/totalPrice';

export function Cart(): ReactElement {
  const { cart } = useCartStorage();

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
