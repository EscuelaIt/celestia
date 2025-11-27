import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'

export type WithInjectionToken<T extends AnyConstructor> = T & {
  readonly ID: InjectionToken
}
