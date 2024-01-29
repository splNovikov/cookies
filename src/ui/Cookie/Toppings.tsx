import React, { Fragment, ReactElement } from 'react';

import { Product } from '../../core/domain/model/Product';
import { useUserStorage } from '../../secondaryAdapters/storageAdapter';
import { ingredients } from '../../core/domain/model/Ingredient';
import { hasAllergy, hasPreference } from '../../core/domain/services/user';

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
