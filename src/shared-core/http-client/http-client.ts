import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import { HttpError } from '@/shared-core/http-client/http-error'
import type { NextHttpError } from '@/shared-core/http-client/next-http-error'

function isNextHttpError(body: unknown): body is NextHttpError {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return typeof b['error'] === 'string' && typeof b['code'] === 'string'
}

export class HttpClient {
  static readonly ID: InjectionToken = Symbol('HttpClient')

  constructor(private readonly baseUrl: string) {}

  private async request<Result, Body = void>(url: string, method: 'POST' | 'GET', body?: Body): Promise<Result> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body !== undefined && { body: JSON.stringify(body) }),
    })
    if (!response.ok) {
      const payload = await response.json()
      if (isNextHttpError(payload)) {
        throw new HttpError(response.status, payload.error, payload.code)
      }
      throw new HttpError(response.status, response.statusText, 'UNKNOWN_ERROR')
    }
    return response.json()
  }

  async get<Result>(url: string) {
    return this.request<Result>(url, 'GET')
  }

  async post<Body, Result = void>(url: string, body: Body): Promise<Result> {
    return this.request<Result, Body>(url, 'POST', body)
  }
}
