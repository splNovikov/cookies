import { ReactElement } from 'react';

import { Toppings } from './Toppings';
import { Product } from '../../core/domain/model/Product';
import { useCartStorage, useUserStorage } from '../../primaryAdapters/storageAdapter';
// todo: domain services???
import { useAddToCart } from '../../core/application/services/addToCart';
import { contains } from '../../core/domain/services/cart';

import styles from './Cookie.module.css';

type CookieProps = {
  cookie: Product;
};

export function Cookie({ cookie }: Readonly<CookieProps>): ReactElement {
  const { user } = useUserStorage();
  const { cart } = useCartStorage();
  const { addToCart } = useAddToCart();

  return (
    <article className={styles.cookie}>
      <span className={styles.image}>🍪</span>
      <span className={styles.title}>{cookie.title}</span>
      <Toppings cookie={cookie} />

      {!!user && (
        <button type="button" onClick={() => addToCart(user, cookie)}>
          {cookie.price / 100} ₽
        </button>
      )}

      {contains(cart, cookie) && <span className={styles.contains}>In your cart</span>}
    </article>
  );
}
