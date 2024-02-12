import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { useUserPrimaryAdapter } from '../../primaryAdapters/userPrimaryAdapter';
import { useCartPrimaryAdapter } from '../../primaryAdapters/cartPrimaryAdapter';

import styles from './Header.module.css';

export function Header(): ReactElement {
  const { user } = useUserPrimaryAdapter();
  const { cart } = useCartPrimaryAdapter();

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
