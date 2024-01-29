import { Fragment, ReactElement } from 'react';
import { useUserStorage } from '../../secondaryAdapters/storageAdapter';
import { ingredients } from '../../core/domain/model/Ingredient';

export function Profile(): ReactElement | null {
  const { user } = useUserStorage();
  if (!user) return null;

  return (
    <Fragment>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Allergies</p>
      <ul>
        {user.allergies.map((ingredient) => (
          <li key={ingredient}>{ingredients[ingredient]}</li>
        ))}
      </ul>
      <p>Preferences</p>
      <ul>
        {user.preferences.map((ingredient) => (
          <li key={ingredient}>{ingredients[ingredient]}</li>
        ))}
      </ul>
    </Fragment>
  );
}
