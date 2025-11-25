import type { InjectionToken } from '@/core/dependency-injection/injection-token'

export interface Container {
  register(key: InjectionToken, instance: unknown): void
  get<Instance>(key: InjectionToken): Instance
}
