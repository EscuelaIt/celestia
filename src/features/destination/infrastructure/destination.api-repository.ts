import type { Destination } from '@/features/destination/domain/destination'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { HttpClient } from '@/shared-core/http-client/http-client'
import type { DestinationDto } from '@/features/destination/infrastructure/destination-dto'
import type { DateTransformer } from '@/features/destination/infrastructure/date.transformer'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export class DestinationApiRepository implements DestinationRepository {
  static readonly ID: InjectionToken = Symbol('DestinationApiRepository')

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dateTransformer: DateTransformer,
  ) {}

  async findAll(): Promise<Destination[]> {
    const destinationsDtos = await this.httpClient.get<DestinationDto[]>('destinations')

    return destinationsDtos.map(dto => ({
      ...dto,
      creationDate: this.dateTransformer.transform(dto.creationDate),
    }))
  }

  async create(createDestination: CreateDestination): Promise<void> {
    return this.httpClient.post<CreateDestination>('destinations', createDestination)
  }
}
