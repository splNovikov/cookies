const DI_TYPES = {
  // interfaces:
  NotificationService: Symbol.for('NotificationService'),
  ApiClientService: Symbol.for('ApiClientService'),

  // self - classes:
  OrderAppService: Symbol.for('OrderAppService'),
};

export { DI_TYPES };
