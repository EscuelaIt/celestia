import type { InjectionToken } from '@/core/dependency-injection/injection-token'

export const ENVIRONMENT_ID: InjectionToken = Symbol('ENVIRONMENT')

export interface Environment {
  NEXT_PUBLIC_BASE_API_URL: string
}
