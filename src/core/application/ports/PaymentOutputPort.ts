export interface PaymentOutputPort {
  tryPay(amount: PriceCents): Promise<boolean>;
}

// todo: ApiClient. оплата должна производится на сервере
// лучшеб сделать интерфейс ApiClient, в котором будет собественный метод оплаты
// todo:  + мы не хендлим ошибки
