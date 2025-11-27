import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCase } from '@/shared-core/use-cases/use-case'

export class TimeoutMiddleware<In, Out> implements Middleware {
  constructor(private readonly ms: number) {}

  async intercept(params: In, useCase: UseCase<In, Out>): Promise<Out> {
    const timeout = new Promise<Out>((_, reject) => setTimeout(() => reject(new Error('Use case timed out')), this.ms))
    return Promise.race([useCase.handle(params), timeout]) as Promise<Out>
  }
}
