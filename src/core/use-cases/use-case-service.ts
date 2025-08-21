import type { UseCase } from '@/core/use-cases/use-case'

export class UseCaseService {
  async execute<In, Out>(useCase: UseCase<In, Out>, params?: In): Promise<Out> {
    return useCase.execute(params)
  }
}
