import type { NextHttpError } from '@/shared-core/http-client/next-http-error'

export function createNextHttpError(error: NextHttpError) {
  return error
}
