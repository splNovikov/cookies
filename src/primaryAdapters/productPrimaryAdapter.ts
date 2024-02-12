import { diContainer } from 'di/inversify.config';
import { DI_TYPES } from 'di/DI_TYPES';

import { ProductInputPort } from '../core/application/inputPorts';
import { Product } from '../core/domain/model';

interface ProductPrimaryAdapter {
  products: Product[];
}
export function useProductPrimaryAdapter(): ProductPrimaryAdapter {
  const productAppService = <ProductInputPort>diContainer.get(DI_TYPES.ProductInputPort);

  return { products: productAppService.getProducts() };
}
