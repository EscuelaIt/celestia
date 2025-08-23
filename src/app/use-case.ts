export interface UseCase<In, Out> {
  handle(input?: In): Promise<Out>
}
