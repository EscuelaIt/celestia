'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AddDestinationForm } from '@/components/add-destination-form'
import type { Destination } from '@/app/destination'
import { getDestinationsQry, useCaseService } from '@/app/container'

import type { ShipType } from '@/app/ship-type'

export function DestinationSelector() {
  const router = useRouter()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [selectedShip, setSelectedShip] = useState<ShipType>('classic')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinations = await useCaseService.execute(getDestinationsQry)
        setDestinations(destinations)
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

  const handleDestinationAdded = async () => {
    setShowAddForm(false)
    setLoading(true)
    // Refresh destinations list
    try {
      const destinations = await useCaseService.execute(getDestinationsQry)
      setDestinations(destinations)
    } catch (err) {
      console.error('Failed to refresh destinations:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
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

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <AddDestinationForm onDestinationAdded={handleDestinationAdded} onCancel={handleCancelAdd} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-white">/</span>Select Destination
          </h2>
          <Button onClick={() => setShowAddForm(true)} variant="outline" className="hover:bg-accent/20">
            + Add New Destination
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destinations.map(destination => (
            <Card
              key={destination.id}
              data-testid="destination-card"
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
              data-testid="ship-classic"
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
              data-testid="ship-advanced"
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
