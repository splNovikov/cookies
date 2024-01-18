import React, { Fragment, ReactElement } from 'react';

import { Product, ingredients } from '../../domain/product';
import { hasAllergy, hasPreference } from '../../domain/user';
import { useUserStorage } from '../../services/storageAdapter';

type ToppingsProps = {
  cookie: Product;
};

export function Toppings({ cookie }: Readonly<ToppingsProps>): ReactElement {
  const { user } = useUserStorage();

  return (
    <ul>
      {cookie.toppings.map((topping) => (
        <li key={topping}>
          {ingredients[topping]} {!!user && hasPreference(user, topping) && <Fragment>👍</Fragment>}{' '}
          {!!user && hasAllergy(user, topping) && <Fragment>⚠️</Fragment>}
        </li>
      ))}
    </ul>
  );
}
