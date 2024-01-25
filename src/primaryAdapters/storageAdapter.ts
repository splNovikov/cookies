import { CartStorageService, OrdersStorageService, UserStorageService } from '../core/application/ports/storage';
import { useStore } from '../services/store';

// It's also possible to split the whole storage into atomic stores.
// Inside corresponding hooks we can apply memoization, optimizations, selectors...
// Well, you get the idea.
export function useUserStorage(): UserStorageService {
  return useStore();
}

export function useCartStorage(): CartStorageService {
  return useStore();
}

// todo: тут могут быть селекторы, разные стораджи, деление по фичам
export function useOrdersStorage(): OrdersStorageService {
  return useStore();
}
