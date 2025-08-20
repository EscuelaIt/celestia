import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function POST() {
  // Only allow this endpoint in development/test environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Reset endpoint not available in production' }, { status: 403 })
  }

  try {
    const dataDirectory = path.join(process.cwd(), 'data')
    const originalFile = path.join(dataDirectory, 'destinations.original.json')
    const currentFile = path.join(dataDirectory, 'destinations.json')

    // Check if original backup exists
    try {
      await fs.access(originalFile)
    } catch {
      return NextResponse.json({ error: 'Original data backup not found' }, { status: 404 })
    }

    // Read original data and overwrite current data
    const originalData = await fs.readFile(originalFile, 'utf8')
    await fs.writeFile(currentFile, originalData, 'utf8')

    return NextResponse.json({ message: 'Test data reset successfully' })
  } catch (error) {
    console.error('Error resetting test data:', error)
    return NextResponse.json({ error: 'Failed to reset test data' }, { status: 500 })
  }
}
