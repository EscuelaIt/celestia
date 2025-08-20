'use client'

import { useState } from 'react'
import { SpaceBackground } from '@/components/space-background'
import { DestinationSelector } from '@/components/destination-selector'
import { TripResults } from '@/components/trip-results'

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

export default function CelestiaApp() {
  const [selectedTrip, setSelectedTrip] = useState<{
    destination: Destination
    shipType: 'classic' | 'advanced'
  } | null>(null)

  const handleDestinationSelect = (destination: Destination, shipType: 'classic' | 'advanced') => {
    setSelectedTrip({ destination, shipType })
  }

  const handleNewTrip = () => {
    setSelectedTrip(null)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tight">
            <span className="text-accent">/</span>Celestia
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Space Travel Planner
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse delay-300"></div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          {!selectedTrip ? (
            <DestinationSelector onDestinationSelect={handleDestinationSelect} />
          ) : (
            <div className="space-y-8">
              <TripResults destination={selectedTrip.destination} shipType={selectedTrip.shipType} />
              <div className="text-center">
                <button
                  onClick={handleNewTrip}
                  className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <span className="text-white">/</span>Plan New Trip
                </button>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">Exploring the cosmos, one journey at a time ✨</p>
        </footer>
      </div>
    </div>
  )
}
