'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Destination {
  id: string
  name: string
  distance: number // in million km
  description: string
  travelTime: {
    classic: number // in days
    advanced: number // in days
  }
  resources: {
    water: number // liters per day
    oxygen: number // kg per day
    food: number // kg per day
  }
  emoji: string
}

const destinations: Destination[] = [
  {
    id: 'moon',
    name: 'Moon',
    distance: 0.384,
    description: 'Our natural satellite, the first step towards the stars',
    travelTime: { classic: 3, advanced: 1 },
    resources: { water: 3.5, oxygen: 0.84, food: 2.1 },
    emoji: '🌙',
  },
  {
    id: 'mars',
    name: 'Mars',
    distance: 225,
    description: 'The red planet, future home of humanity',
    travelTime: { classic: 260, advanced: 120 },
    resources: { water: 4.2, oxygen: 1.0, food: 2.8 },
    emoji: '🔴',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    distance: 628,
    description: 'The gas giant with its fascinating moons',
    travelTime: { classic: 550, advanced: 280 },
    resources: { water: 5.0, oxygen: 1.2, food: 3.5 },
    emoji: '🪐',
  },
  {
    id: 'europa',
    name: 'Europa',
    distance: 628,
    description: "Jupiter's moon with oceans beneath its frozen surface",
    travelTime: { classic: 580, advanced: 300 },
    resources: { water: 4.8, oxygen: 1.15, food: 3.2 },
    emoji: '🧊',
  },
]

interface DestinationSelectorProps {
  onDestinationSelect: (destination: Destination, shipType: 'classic' | 'advanced') => void
}

export function DestinationSelector({ onDestinationSelect }: DestinationSelectorProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [selectedShip, setSelectedShip] = useState<'classic' | 'advanced'>('classic')

  const handlePlanTrip = () => {
    if (selectedDestination) {
      onDestinationSelect(selectedDestination, selectedShip)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          <span className="text-accent">/</span>Select Destination
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destinations.map(destination => (
            <Card
              key={destination.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedDestination?.id === destination.id
                  ? 'ring-2 ring-accent bg-card/80 animate-pulse-glow'
                  : 'hover:bg-card/60'
              }`}
              onClick={() => setSelectedDestination(destination)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl animate-float">{destination.emoji}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">{destination.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {destination.distance} million km
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedDestination && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            <span className="text-accent">/</span>Ship Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedShip === 'classic' ? 'ring-2 ring-primary bg-card/80' : 'hover:bg-card/60'
              }`}
              onClick={() => setSelectedShip('classic')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Classic Rocket</h4>
                    <p className="text-sm text-muted-foreground">Proven and reliable technology</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedShip === 'advanced' ? 'ring-2 ring-primary bg-card/80' : 'hover:bg-card/60'
              }`}
              onClick={() => setSelectedShip('advanced')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛸</span>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Advanced Ship</h4>
                    <p className="text-sm text-muted-foreground">Next-generation propulsion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full flex justify-center">
            <Button
              onClick={handlePlanTrip}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-white">/</span>Calculate Trip
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
