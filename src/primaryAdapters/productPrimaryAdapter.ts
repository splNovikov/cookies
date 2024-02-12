import { diContainer } from 'di/inversify.config';

import { ProductAppService } from '../core/application/services/ProductAppService';
import { Product } from '../core/domain/model';

interface ProductPrimaryAdapter {
  products: Product[];
}
export function useProductPrimaryAdapter(): ProductPrimaryAdapter {
  const productAppService = diContainer.get(ProductAppService);

  return { products: productAppService.getProducts() };
}
