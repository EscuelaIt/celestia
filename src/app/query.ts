import type { UseCase } from '@/app/use-case'

export type Query<Out, In = void> = UseCase<In, Out>
