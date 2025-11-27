export type UseCaseParams<T extends UseCase> = T extends UseCase<infer P> ? P : unknown
export type UseCaseReturn<T extends UseCase> = T extends UseCase<unknown, infer R> ? R : unknown

export interface UseCase<In = unknown, Out = unknown> {
  handle(input?: In): Promise<Out>
}
