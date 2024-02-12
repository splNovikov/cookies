const DI_TYPES = {
  AuthInputPort: Symbol.for('AuthInputPort'),
  CartInputPort: Symbol.for('CartInputPort'),
  OrderInputPort: Symbol.for('OrderInputPort'),
  ProductInputPort: Symbol.for('ProductInputPort'),

  NotificationOutputPort: Symbol.for('NotificationOutputPort'),
  ApiClientOutputPort: Symbol.for('ApiClientOutputPort'),
  PaymentOutputPort: Symbol.for('PaymentOutputPort'),
  StorageOutputPort: Symbol.for('StorageOutputPort'),
  UserStorageOutputPort: Symbol.for('UserStorageOutputPort'),
  OrderStorageOutputPort: Symbol.for('OrderStorageOutputPort'),
  CartStorageOutputPort: Symbol.for('CartStorageOutputPort'),
  ProductStorageOutputPort: Symbol.for('ProductStorageOutputPort'),
};

export { DI_TYPES };
