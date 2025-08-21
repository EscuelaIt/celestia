import type { UseCase } from '@/app/use-cases/use-case'

export type Command<In, Out = void> = UseCase<In, Out>
