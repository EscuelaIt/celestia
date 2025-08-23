import type { UseCase } from '@/use-cases/use-case'

export type Command<In, Out = void> = UseCase<In, Out>
