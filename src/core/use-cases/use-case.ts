export interface UseCase<In = unknown, Out = unknown> {
  handle(input?: In): Promise<Out>
}
