import type { Transformer } from '@/core/transformers/trasnformer'

type Iso8601Date = string

export class DateTransformer implements Transformer<Iso8601Date, Date> {
  static readonly ID = 'DateTransformer'

  transform(input: Iso8601Date): Date {
    return new Date(input)
  }
}
