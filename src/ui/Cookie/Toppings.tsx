import React, { Fragment, ReactElement } from 'react';

import { useUserPrimaryAdapter } from '../../primaryAdapters/userPrimaryAdapter';
import { Product } from '../../core/domain/model/Product';
import { ingredients } from '../../core/domain/model/Ingredient';

type ToppingsProps = {
  cookie: Product;
};

export function Toppings({ cookie }: Readonly<ToppingsProps>): ReactElement {
  const { user, hasAllergy, hasPreference } = useUserPrimaryAdapter();

  return (
    <ul>
      {cookie.toppings.map((topping) => (
        <li key={topping}>
          {ingredients[topping]} {!!user && hasPreference(topping) && <Fragment>👍</Fragment>}{' '}
          {!!user && hasAllergy(topping) && <Fragment>⚠️</Fragment>}
        </li>
      ))}
    </ul>
  );
}
