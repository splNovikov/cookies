import { PaymentService } from '../core/application/ports/payment';
import { fakeApi } from './api';

// todo: [novikov] those hooks are "adapters". Should it be hooks though
export function usePayment(): PaymentService {
  return {
    tryPay(amount: PriceCents) {
      return fakeApi(false);
    },
  };
}
