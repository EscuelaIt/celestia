import type { LogLevel } from '@/shared-core/use-cases/middlewares/log-level'

export interface UseCaseOptions {
  logLevel?: LogLevel
  success?: string
}
