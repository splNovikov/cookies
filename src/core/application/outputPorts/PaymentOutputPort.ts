export interface PaymentOutputPort {
  tryPay(amount: PriceCents): Promise<boolean>;
}

// todo: ApiClient. Payment should be provided at BE side
// it is better to create interface ApiClient, which has own function "pay"
// todo:  + error handling
