import React, { ReactElement, useState } from 'react';

import { useUserPrimaryAdapter } from '../../primaryAdapters/userPrimaryAdapter';
import { useOrderPrimaryAdapter } from '../../primaryAdapters/orderPrimaryAdapter';
import { useCartPrimaryAdapter } from '../../primaryAdapters/cartPrimaryAdapter';
import { UserName } from '../../core/domain/model/User';

import styles from './Buy.module.css';

export function Buy(): ReactElement | null {
  const { orderProducts } = useOrderPrimaryAdapter();
  const { user } = useUserPrimaryAdapter();
  const { cart } = useCartPrimaryAdapter();

  const [name, setName] = useState<UserName>(user?.name ?? '');
  const [email, setEmail] = useState<Email>(user?.email ?? '');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || !cart.products.length) return null;
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!user) {
      return;
    }

    setLoading(true);
    await orderProducts(user, cart);
    setLoading(false);
  }

  return (
    <section>
      <h2>Checkout</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Address</span>
          <textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Preparing an order...' : 'Checkout'}
        </button>
      </form>
    </section>
  );
}
