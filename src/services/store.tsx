import React, { useState, useContext, ReactNode, useMemo, ReactElement } from 'react';
import { cookies } from './fakeData';
import { Cart } from '../core/domain/model/Cart';
import { Product } from '../core/domain/model/Product';

// todo: figure out where this file should take place. The folder "services" itself should not exist
const StoreContext = React.createContext<any>({});
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useStore = () => useContext(StoreContext);

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps): ReactElement => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState(new Cart([]));
  const [orders, setOrders] = useState([]);

  const value = useMemo(
    () => ({
      user,
      cart,
      cookies: cookies.map(({ id, price, toppings, title }) => new Product(id, title, price, toppings)),
      orders,
      updateUser: setUser,
      updateCart: setCart,
      updateOrders: setOrders,
      // todo: I've replaced "setCart({ products: [] })" with new Cart([]).
      //  I think it is better to implement emptyCart method
      emptyCart: () => setCart(new Cart([])),
    }),
    [cart, orders, user],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
