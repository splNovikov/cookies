import { PaymentService } from '../core/application/ports/payment';
import { fakeApi } from './api';

export function usePayment(): PaymentService {
  return {
    tryPay(amount: PriceCents) {
      return fakeApi(true);
    },
  };
}
