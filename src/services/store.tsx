import React, { useState, useContext, ReactNode, useMemo, ReactElement } from 'react';
import { cookies } from './fakeData';

const StoreContext = React.createContext<any>({});
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useStore = () => useContext(StoreContext);

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps): ReactElement => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState({ products: [] });
  const [orders, setOrders] = useState([]);

  const value = useMemo(
    () => ({
      user,
      cart,
      cookies,
      orders,
      updateUser: setUser,
      updateCart: setCart,
      updateOrders: setOrders,
      emptyCart: () => setCart({ products: [] }),
    }),
    [cart, orders, user],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
