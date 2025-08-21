export interface UseCase<In = void, Out = void> {
  execute(input: In): Promise<Out>
}
