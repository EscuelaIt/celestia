import type { InjectionToken } from '@/core/dependency-injection/injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'

export type WithInjectionToken<T extends AnyConstructor> = T & {
  readonly ID: InjectionToken
}
