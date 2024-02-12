export interface StorageOutputPort {
  subscribe(callback: () => void): void;
}
