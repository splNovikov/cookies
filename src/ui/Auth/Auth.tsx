import React, { ReactElement, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { UserName } from '../../domain/user';
import { useAuthenticate } from '../../application/authenticate';
import styles from './Auth.module.css';

export function Auth(): ReactElement {
  const [name, setName] = useState<UserName>('');
  const [email, setEmail] = useState<Email>('');
  const [loading, setLoading] = useState(false);

  const { user, authenticate } = useAuthenticate();
  if (user) return <Navigate to="/" />;

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    setLoading(true);
    e.preventDefault();

    await authenticate(name, email);
    setLoading(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Trying to login.....' : 'Login'}
      </button>
    </form>
  );
}
