import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import type { Destination } from '@/features/destination/destination'
import type { CreateDestination } from '@/features/destination/destination-create/create-destination'

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
    const newDestination: CreateDestination = await request.json()

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

    // Generate unique ID
    const id = newDestination.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // Check if destination already exists
    if (destinations.find(d => d.id === id)) {
      return NextResponse.json({ error: 'A destination with this name already exists' }, { status: 409 })
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
    return NextResponse.json({ error: 'Failed to add destination' }, { status: 500 })
  }
}
