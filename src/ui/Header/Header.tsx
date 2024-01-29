import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import styles from './Header.module.css';
import { useCartStorage, useUserStorage } from '../../secondaryAdapters/storageAdapter';

export function Header(): ReactElement {
  const { user } = useUserStorage();
  const { cart } = useCartStorage();
  console.log('cart', cart);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        Co0o0o0o0okie!!!1 🍪
      </Link>

      {!user ? (
        <Link to="/auth">Log in</Link>
      ) : (
        <Link to="/user">
          {user.name} ({cart.products.length})
        </Link>
      )}
    </header>
  );
}
