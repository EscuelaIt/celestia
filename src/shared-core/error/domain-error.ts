import type { ErrorCode } from '@/shared-core/error/error-codes'

export class DomainError extends Error {
  constructor(
    readonly code: ErrorCode,
    message: string,
  ) {
    super(message)
  }
}
