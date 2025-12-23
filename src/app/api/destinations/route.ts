import { NextRequest, NextResponse } from 'next/server'
import { ERROR_CODES } from '@/shared-core/error/error-codes'
import path from 'path'
import { promises as fs } from 'fs'
import { createNextHttpError } from '@/shared-core/http-client/create-next-http-error'
import type { Id } from '@/shared-core/types/id'
import type { DestinationDto } from '@/features/destination/infrastructure/destination-dto'

async function readDestinationsFromFile(): Promise<DestinationDto[]> {
  const jsonDirectory = path.join(process.cwd(), 'data')
  const fileContents = await fs.readFile(jsonDirectory + '/destinations.json', 'utf8')
  const destinations = JSON.parse(fileContents) as DestinationDto[]
  return destinations
}

async function writeToFile(destinations: DestinationDto[]): Promise<void> {
  const jsonDirectory = path.join(process.cwd(), 'data')
  await fs.writeFile(jsonDirectory + '/destinations.json', JSON.stringify(destinations, null, 2), 'utf8')
}

export async function GET() {
  try {
    const destinations = await readDestinationsFromFile()

    return NextResponse.json(destinations)
  } catch (error) {
    console.error('Error reading destinations:', error)
    return NextResponse.json({ error: 'Failed to load destinations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newDestination: Omit<DestinationDto, 'id'> = await request.json()

    // Validate required fields
    if (
      !newDestination.name ||
      !newDestination.distance ||
      !newDestination.description ||
      !newDestination.travelTime ||
      !newDestination.emoji
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: name, distance, description, travelTime, emoji' },
        { status: 400 },
      )
    }

    // Validate travelTime structure
    if (!newDestination.travelTime.classic || !newDestination.travelTime.advanced) {
      return NextResponse.json({ error: 'travelTime must include both classic and advanced values' }, { status: 400 })
    }

    const destinations = await readDestinationsFromFile()

    const id = newDestination.name

    // Check if destination already exists
    if (destinations.find(d => d.name === id)) {
      return NextResponse.json(
        createNextHttpError({
          error: 'A destination with this name already exists',
          code: ERROR_CODES.DESTINATION_DUPLICATED_NAME,
        }),
        { status: 409 },
      )
    }

    // Create new destination with ID
    const destinationWithId: DestinationDto = {
      id,
      ...newDestination,
    }

    // Add to destinations array
    destinations.push(destinationWithId)

    await writeToFile(destinations)

    return NextResponse.json(destinationWithId, { status: 201 })
  } catch (error) {
    console.error('Error adding destination:', error)
    return NextResponse.json(createNextHttpError({ error: 'Failed to add destination', code: 'DESTINATION_CREATE' }), {
      status: 500,
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const destinationId: Id = await request.json()
    console.log({ destinationId })

    if (!destinationId) {
      return NextResponse.json(
        createNextHttpError({
          error: 'Missing Id',
          code: 'DESTINATION_DELETE_MISSING_ID',
        }),
        { status: 400 },
      )
    }

    const destinations = await readDestinationsFromFile()

    const newDestinations = destinations.filter(x => x.id !== destinationId)

    await writeToFile(newDestinations)

    return NextResponse.json({ id: destinationId }, { status: 201 })
  } catch (error) {
    console.error('Error removing destination:', error)
    return NextResponse.json(
      createNextHttpError({ error: 'Failed to remove destination', code: 'DESTINATION_DELETE' }),
      {
        status: 500,
      },
    )
  }
}
