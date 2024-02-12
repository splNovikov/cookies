import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useUserPrimaryAdapter } from '../../primaryAdapters/userPrimaryAdapter';

import { Buy } from '../Buy';
import { Cart } from '../Cart';
import { Orders } from '../Orders';
import { Profile } from '../Profile';

export function User(): ReactElement {
  const { user } = useUserPrimaryAdapter();

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
