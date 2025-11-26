import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export class TimerMiddleware implements Middleware {
  async intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    console.log('Timer middleware started')
    await sleep(1000)
    console.log('Timer middleware ends')
    return useCase.handle(params)
  }
}
