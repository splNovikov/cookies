import { ReactElement } from 'react';

import { Toppings } from './Toppings';
import { Product } from '../../core/domain/model/Product';
// todo: import from domain-service???
import { contains } from '../../core/domain/services/cart';
// todo: import from secondary-adapters???
import { useCartStorage, useUserStorage } from '../../secondaryAdapters/storageAdapter';
import { useCartAdapter } from '../../primaryAdapters/cartAdapter';

import styles from './Cookie.module.css';

type CookieProps = {
  cookie: Product;
};

export function Cookie({ cookie }: Readonly<CookieProps>): ReactElement {
  const { user } = useUserStorage();
  const { cart } = useCartStorage();
  const { addToCart } = useCartAdapter();

  return (
    <article className={styles.cookie}>
      <span className={styles.image}>🍪</span>
      <span className={styles.title}>{cookie.title}</span>
      <Toppings cookie={cookie} />

      {!!user && (
        <button type="button" onClick={() => addToCart(cookie)}>
          {cookie.price / 100} ₽
        </button>
      )}

      {contains(cart, cookie) && <span className={styles.contains}>In your cart</span>}
    </article>
  );
}
