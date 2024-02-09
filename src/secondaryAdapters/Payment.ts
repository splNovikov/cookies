import { injectable } from 'inversify';

import { PaymentOutputPort } from '../core/application/ports/PaymentOutputPort';
import { fakeApi } from './fakeApi';

@injectable()
export class Payment implements PaymentOutputPort {
  // eslint-disable-next-line class-methods-use-this
  tryPay(amount: PriceCents): Promise<boolean> {
    return fakeApi(true, amount);
  }
}
