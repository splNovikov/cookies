import { PaymentService } from '../core/application/ports/payment';
import { fakeApi } from './fakeApi';

// todo: [novikov] those hooks are "adapters". Should it be hooks though
export function usePayment(): PaymentService {
  return {
    tryPay(amount: PriceCents) {
      return fakeApi(true);
    },
  };
}
