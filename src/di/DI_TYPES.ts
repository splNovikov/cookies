const DI_TYPES = {
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
