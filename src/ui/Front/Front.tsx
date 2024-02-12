import { ReactElement } from 'react';

import { useProductPrimaryAdapter } from '../../primaryAdapters/productPrimaryAdapter';
import { Product } from '../../core/domain/model';

import { Cookie } from '../Cookie';

import styles from './Front.module.css';

export function Front(): ReactElement {
  const { products } = useProductPrimaryAdapter();

  return (
    <main>
      <h1>Cookies</h1>

      <ul className={styles.list}>
        {products.map((cookie: Product) => (
          <li key={cookie.id}>
            <Cookie cookie={cookie} />
          </li>
        ))}
      </ul>
    </main>
  );
}
