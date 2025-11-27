import type { UseCase } from '@/shared-core/use-cases/use-case'

export type Query<Out, In = void> = UseCase<In, Out>
