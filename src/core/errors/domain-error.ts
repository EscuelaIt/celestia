import type { ErrorCode } from '@/core/errors/error-codes'

export abstract class DomainError extends Error {
  protected constructor(
    readonly code: ErrorCode,
    message: string,
  ) {
    super(message)
  }
}
