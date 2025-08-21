import type { UseCase } from '@/app/use-case'

export type Command<In, Out = void> = UseCase<In, Out>
