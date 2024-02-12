import React, { ReactElement } from 'react';
import { cookies } from './fakeData';
import { Product } from '../core/domain/model/Product';
import { Cart } from '../core/domain/model/Cart';
import { User } from '../core/domain/model/User';
import { Order } from '../core/domain/model/Order';

import { ProductDTO } from './ProductDTO';

type Listener<T> = (data: T) => void;
type StoreObserver<T> = {
  getState(): T;
  setState(fn: (state: T) => T): void;
  subscribe(listener: Listener<T>): void;
};
type InitialState = {
  user?: User;
  cart: Cart;
  cookies: Product[];
  orders: Order[];
};

const initialState: InitialState = {
  user: undefined,
  cart: new Cart([]),
  cookies: cookies.map(({ id, price, toppings, title }: ProductDTO) => new Product(id, title, price, toppings)),
  orders: [],
};
export const storeObserver = (function <T>(initState: T): StoreObserver<T> {
  let value = initState;
  let listeners: Listener<T>[] = [];
  const getState = (): T => value;
  const setState = (fn: (state: T) => T): void => {
    value = fn(value);
    listeners.forEach((l) => l(value));
  };
  const subscribe = (listener: Listener<T>): (() => void) => {
    listeners.push(listener);

    // unsubscribe callback on return
    return () => {
      listeners = listeners.filter((f) => f !== listener);
    };
  };
  return { getState, setState, subscribe };
})(initialState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = React.createContext<any>({});

type ProviderProps<T> = {
  store: StoreObserver<T>;
  children: ReactElement;
};
export function Provider<T>({ store, children }: Readonly<ProviderProps<T>>): ReactElement {
  const [state, setState] = React.useState(store.getState());

  // todo: remove it?
  React.useEffect(
    () =>
      store.subscribe(() => {
        const lastState = store.getState();

        // if a lot of setState calls are made synchronously
        //  do not update dom but let it batch update state
        //  before triggering a render
        Promise.resolve().then(() => {
          if (lastState === store.getState()) {
            setState(store.getState());
          }
        });
      }),
    [store],
  );
  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>;
}
