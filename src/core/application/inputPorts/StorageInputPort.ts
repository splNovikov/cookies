export interface StorageInputPort {
  subscribe(callback: () => void): void;
}
