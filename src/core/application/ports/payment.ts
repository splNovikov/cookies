// todo: ApiClient. оплата должна производится на сервере
// лучшеб сделать интерфейс ApiClient, в котором будет собественный метод оплаты
// todo:  + мы не хендлим ошибки
export interface PaymentService {
  tryPay(amount: PriceCents): Promise<boolean>;
}
