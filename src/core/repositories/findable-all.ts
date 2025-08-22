export interface FindableAll<T, Options = void> {
  findAll(options: Options): Promise<T[]>
}
