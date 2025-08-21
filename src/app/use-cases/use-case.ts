export interface UseCase<In = unknown, Out = unknown> {
  execute(input?: In): Promise<Out>
}
