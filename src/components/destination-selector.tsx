'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

export function DestinationSelector() {
  const router = useRouter()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [selectedShip, setSelectedShip] = useState<'classic' | 'advanced'>('classic')

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        if (!response.ok) {
          throw new Error('Failed to fetch destinations')
        }
        const data = await response.json()
        setDestinations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const handlePlanTrip = () => {
    if (selectedDestination) {
      // Navigate to trip results page instead of calling callback
      router.push(`/trip/${selectedDestination.id}/${selectedShip}`)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading destinations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
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
