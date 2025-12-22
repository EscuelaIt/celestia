import type { ErrorCode } from '@/shared-core/error/error-codes'

export class HttpError extends Error {
  readonly status: number
  readonly code: ErrorCode

  constructor(status: number, message: string, code: ErrorCode) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
  }
}
