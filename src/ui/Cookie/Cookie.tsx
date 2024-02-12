import { ReactElement } from 'react';

import { useUserPrimaryAdapter } from '../../primaryAdapters/userPrimaryAdapter';
import { useCartPrimaryAdapter } from '../../primaryAdapters/cartPrimaryAdapter';
import { Product } from '../../core/domain/model/Product';

import { Toppings } from './Toppings';

import styles from './Cookie.module.css';

type CookieProps = {
  cookie: Product;
};

export function Cookie({ cookie }: Readonly<CookieProps>): ReactElement {
  const { user } = useUserPrimaryAdapter();
  const { addToCart, containsProduct } = useCartPrimaryAdapter();

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

      {containsProduct(cookie) && <span className={styles.contains}>In your cart</span>}
    </article>
  );
}
