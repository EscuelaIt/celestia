import type { ErrorCode } from '@/shared-core/error/error-codes'

export interface NextHttpError {
  error: string
  code: ErrorCode
}
