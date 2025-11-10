import type { InjectionToken } from '@/core/container/injection-token'

// A class/constructor that carries a static injection token `id`.
// The generic `T` is a constructor type, and the resulting type is the same
// constructor type intersected with the `{ id }` static property.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithInjectionToken<T extends abstract new (...args: any) => any> = T & {
  readonly id: InjectionToken
}
