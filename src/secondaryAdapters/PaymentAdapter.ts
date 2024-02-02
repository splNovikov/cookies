import { injectable } from 'inversify';

import { PaymentPort } from '../core/application/ports/PaymentPort';
import { fakeApi } from './fakeApi';

@injectable()
export class Payment implements PaymentPort {
  // eslint-disable-next-line class-methods-use-this
  tryPay(amount: PriceCents): Promise<boolean> {
    return fakeApi(true, amount);
  }
}
