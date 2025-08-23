import type { UseCase } from '@/app/use-case'

export class UseCaseService {
  execute<In, Out>(useCase: UseCase<In, Out>, params?: In): Promise<Out> {
    return useCase.execute(params)
  }
}
