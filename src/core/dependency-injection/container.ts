export interface Container {
  register(key: string, instance: unknown): void
  get<Instance>(key: string): Instance
}
