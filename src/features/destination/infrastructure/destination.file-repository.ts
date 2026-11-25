import path from 'path'
import { promises as fs } from 'fs'
import type { Destination } from '@/features/destination/domain/destination'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { DestinationDto } from '@/features/destination/infrastructure/destination-dto'
import type { DateTransformer } from '@/features/destination/infrastructure/date.transformer'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { Id } from '@/shared-core/types/id'

export class DestinationFileRepository implements DestinationRepository {
  static readonly ID: InjectionToken = Symbol('DestinationFileRepository')

  private readonly filePath = path.join(process.cwd(), 'data', 'destinations.json')

  constructor(private readonly dateTransformer: DateTransformer) {}

  async findAll(): Promise<Destination[]> {
    const destinationDtos = await this.read()

    return destinationDtos.map(dto => ({
      ...dto,
      creationDate: this.dateTransformer.transform(dto.creationDate),
    }))
  }

  async create(createDestination: CreateDestination): Promise<void> {
    const destinationDtos = await this.read()
    const destinationDto: DestinationDto = {
      ...createDestination,
      id: createDestination.name,
      creationDate: createDestination.creationDate.toISOString(),
    }

    await this.write([...destinationDtos, destinationDto])
  }

  async delete(id: Id): Promise<void> {
    const destinationDtos = await this.read()

    await this.write(destinationDtos.filter(dto => dto.id !== id))
  }

  private async read(): Promise<DestinationDto[]> {
    const fileContents = await fs.readFile(this.filePath, 'utf8')
    return JSON.parse(fileContents) as DestinationDto[]
  }

  private async write(destinationDtos: DestinationDto[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(destinationDtos, null, 2), 'utf8')
  }
}
