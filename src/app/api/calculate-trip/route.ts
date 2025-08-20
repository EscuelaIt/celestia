import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

interface Destination {
  id: string
  name: string
  distance: number
  description: string
  travelTime: {
    classic: number
    advanced: number
  }
  resources: {
    water: number
    oxygen: number
    food: number
  }
  emoji: string
}

interface TripCalculation {
  destination: Destination
  shipType: 'classic' | 'advanced'
  travelTime: number
  totalWater: number
  totalOxygen: number
  totalFood: number
  totalLoad: number
  averageSpeed: number
}

export async function POST(request: NextRequest) {
  try {
    const { destinationId, shipType } = await request.json()

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
    const totalWater = Math.ceil(destination.resources.water * travelTime)
    const totalOxygen = Math.ceil(destination.resources.oxygen * travelTime)
    const totalFood = Math.ceil(destination.resources.food * travelTime)
    const totalLoad = totalWater + totalOxygen + totalFood
    const averageSpeed = Math.round((destination.distance * 1000000) / (travelTime * 24))

    const calculation: TripCalculation = {
      destination,
      shipType,
      travelTime,
      totalWater,
      totalOxygen,
      totalFood,
      totalLoad,
      averageSpeed,
    }

    return NextResponse.json(calculation)
  } catch (error) {
    console.error('Error calculating trip:', error)
    return NextResponse.json({ error: 'Failed to calculate trip' }, { status: 500 })
  }
}
