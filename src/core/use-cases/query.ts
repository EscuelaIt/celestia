import type { UseCase } from '@/core/use-cases/use-case'

export type Query<Out, In = void> = UseCase<In, Out>
