export interface Creatable<T, R = void> {
  create(entity: T): Promise<R>
}
