import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import type { Destination } from '@/features/destination/domain/destination'
import type { Id } from '@/shared-core/types/id'
import type { Trip } from '@/features/trip/domain/trip'
import type { ShipType } from '@/features/trip/domain/ship-type'

export async function POST(request: NextRequest) {
  try {
    const { destinationId, shipType }: { destinationId: Id; shipType: ShipType } = await request.json()

    if (!destinationId || !shipType) {
      return NextResponse.json({ error: 'destinationId and shipType are required' }, { status: 400 })
    }

    if (shipType !== 'classic' && shipType !== 'advanced') {
      return NextResponse.json({ error: 'shipType must be either "classic" or "advanced"' }, { status: 400 })
    }

    // Read destinations from JSON file
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/destinations.json', 'utf8')
    const destinations: Destination[] = JSON.parse(fileContents)

    // Find the destination
    const destination = destinations.find(d => d.id === destinationId)
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
    }

    // Calculate trip details
    const travelTime = destination.travelTime[shipType]
    const averageSpeed = Math.round((destination.distance * 1000000) / (travelTime * 24))

    const trip: Trip = {
      destination,
      shipType,
      travelTime,
      averageSpeed,
    }

    return NextResponse.json(trip)
  } catch (error) {
    console.error('Error calculating trip:', error)
    return NextResponse.json({ error: 'Failed to calculate trip' }, { status: 500 })
  }
}
