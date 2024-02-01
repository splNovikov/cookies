import { injectable } from 'inversify';

import { PaymentService } from '../core/application/ports/payment';
import { fakeApi } from './fakeApi';

@injectable()
export class Payment implements PaymentService {
  // eslint-disable-next-line class-methods-use-this
  tryPay(amount: PriceCents): Promise<boolean> {
    return fakeApi(true, amount);
  }
}
