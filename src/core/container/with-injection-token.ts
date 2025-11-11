import type { InjectionToken } from '@/core/container/injection-token'

// A helper for "any constructor signature". We intentionally use `any[]` here
// to preserve assignability for heterogeneous constructors across the app.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<T = unknown> = abstract new (...args: any[]) => T

// A class/constructor that carries a static injection token `id`.
// The generic `T` is a constructor type, and the resulting type is the same
// constructor type intersected with the `{ id }` static property.
export type WithInjectionToken<T extends AnyConstructor> = T & {
  readonly id: InjectionToken
}
