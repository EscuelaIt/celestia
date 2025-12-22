import { NextRequest, NextResponse } from 'next/server'
import { ERROR_CODES } from '@/shared-core/error/error-codes'
import path from 'path'
import { promises as fs } from 'fs'
import type { Destination } from '@/features/destination/domain/destination'
import { createNextHttpError } from '@/shared-core/http-client/create-next-http-error'

export async function GET() {
  try {
    // Read the destinations JSON file
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/destinations.json', 'utf8')
    const destinations = JSON.parse(fileContents)

    return NextResponse.json(destinations)
  } catch (error) {
    console.error('Error reading destinations:', error)
    return NextResponse.json({ error: 'Failed to load destinations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newDestination: Omit<Destination, 'id'> = await request.json()

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

    // Read existing destinations
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/destinations.json', 'utf8')
    const destinations: Destination[] = JSON.parse(fileContents)

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
    const destinationWithId: Destination = {
      id,
      ...newDestination,
    }

    // Add to destinations array
    destinations.push(destinationWithId)

    // Write back to file
    await fs.writeFile(jsonDirectory + '/destinations.json', JSON.stringify(destinations, null, 2), 'utf8')

    return NextResponse.json(destinationWithId, { status: 201 })
  } catch (error) {
    console.error('Error adding destination:', error)
    return NextResponse.json(createNextHttpError({ error: 'Failed to add destination', code: 'DESTINATION_CREATE' }), {
      status: 500,
    })
  }
}
