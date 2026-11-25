import type { Notifier } from '@/features/notification/domain/notifier'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export class ConsoleNotifier implements Notifier {
  static readonly ID: InjectionToken = Symbol('ConsoleNotifier')

  async notify(message: string): Promise<void> {
    console.info(`[crew notification] ${message}`)
  }
}
