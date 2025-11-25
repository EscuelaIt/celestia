import type { Transformer } from '@/core/transformers/trasnformer'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'

type Iso8601Date = string

export class DateTransformer implements Transformer<Iso8601Date, Date> {
  static readonly ID: InjectionToken = Symbol('DateTransformer')

  transform(input: Iso8601Date): Date {
    return new Date(input)
  }
}
