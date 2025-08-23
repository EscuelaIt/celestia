import type { UseCase } from '@/use-cases/use-case'

export type Query<Out, In = void> = UseCase<In, Out>
