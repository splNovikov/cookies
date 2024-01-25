import { Navigate } from 'react-router-dom';

import { ReactElement } from 'react';

import { Buy } from '../Buy';
import { Cart } from '../Cart';
import { Orders } from '../Orders';
import { Profile } from '../Profile';
import { useUserStorage } from '../../primaryAdapters/storageAdapter';

export function User(): ReactElement {
  const { user } = useUserStorage();
  if (!user) return <Navigate to="/auth" />;

  return (
    <main>
      <Profile />
      <Orders />
      <Cart />
      <Buy />
    </main>
  );
}
