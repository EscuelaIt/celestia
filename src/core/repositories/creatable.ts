export interface Creatable<Params, Result = void> {
  create(params: Params): Promise<Result>
}
