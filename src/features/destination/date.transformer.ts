import type { Transformer } from '@/features/destination/trasnformer'

type Iso8601Date = string

export class DateTransformer implements Transformer<Iso8601Date, Date> {
  transform(input: Iso8601Date): Date {
    return new Date(input)
  }
}
