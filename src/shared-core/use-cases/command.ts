import type { UseCase } from '@/shared-core/use-cases/use-case'

export type Command<In, Out = void> = UseCase<In, Out>
