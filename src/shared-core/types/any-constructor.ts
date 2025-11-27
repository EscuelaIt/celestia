// This as a very dynamic type that represents any type of instanceable class
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConstructor<T = unknown> = abstract new (...args: any[]) => T
