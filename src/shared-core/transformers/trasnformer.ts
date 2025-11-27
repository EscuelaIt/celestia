export interface Transformer<In, Out> {
  transform(input: In): Out
}
