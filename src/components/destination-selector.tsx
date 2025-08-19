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
    name: 'Luna',
    distance: 0.384,
    description: 'Nuestro satélite natural, el primer paso hacia las estrellas',
    travelTime: { classic: 3, advanced: 1 },
    resources: { water: 3.5, oxygen: 0.84, food: 2.1 },
    emoji: '🌙',
  },
  {
    id: 'mars',
    name: 'Marte',
    distance: 225,
    description: 'El planeta rojo, futuro hogar de la humanidad',
    travelTime: { classic: 260, advanced: 120 },
    resources: { water: 4.2, oxygen: 1.0, food: 2.8 },
    emoji: '🔴',
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    distance: 628,
    description: 'El gigante gaseoso con sus fascinantes lunas',
    travelTime: { classic: 550, advanced: 280 },
    resources: { water: 5.0, oxygen: 1.2, food: 3.5 },
    emoji: '🪐',
  },
  {
    id: 'europa',
    name: 'Europa',
    distance: 628,
    description: 'Luna de Júpiter con océanos bajo su superficie helada',
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
          <span className="text-accent">/</span>Seleccionar Destino
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
                      {destination.distance} millones km
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
            <span className="text-accent">/</span>Tipo de Nave
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
                    <h4 className="font-semibold text-card-foreground">Cohete Clásico</h4>
                    <p className="text-sm text-muted-foreground">Tecnología probada y confiable</p>
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
                    <h4 className="font-semibold text-card-foreground">Nave Avanzada</h4>
                    <p className="text-sm text-muted-foreground">Propulsión de nueva generación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={handlePlanTrip}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-accent">/</span>Calcular Viaje
          </Button>
        </div>
      )}
    </div>
  )
}
