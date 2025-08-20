import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

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
