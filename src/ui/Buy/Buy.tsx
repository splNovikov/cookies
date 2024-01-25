import React, { ReactElement, useState } from 'react';
import styles from './Buy.module.css';
import { useOrderProducts } from '../../core/application/services/orderProducts';
import { useCartStorage, useUserStorage } from '../../primaryAdapters/storageAdapter';
import { UserName } from '../../core/domain/model/User';

export function Buy(): ReactElement | null {
  const { orderProducts } = useOrderProducts();
  const { user } = useUserStorage();
  const { cart } = useCartStorage();

  const [name, setName] = useState<UserName>(user?.name ?? '');
  const [email, setEmail] = useState<Email>(user?.email ?? '');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || !cart.products.length) return null;
  async function handleSubmit(e: React.FormEvent): Promise<void> {
    setLoading(true);
    e.preventDefault();
    await orderProducts(user!, cart);
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
