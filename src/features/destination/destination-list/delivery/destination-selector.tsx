'use client'

import { type FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardAction, CardContent } from '@/shared-core/components/ui/card'
import { Button } from '@/shared-core/components/ui/button'
import { Badge } from '@/shared-core/components/ui/badge'
import type { Destination } from '@/features/destination/domain/destination'

import type { ShipType } from '@/features/trip/domain/ship-type'
import { Trash } from 'lucide-react'
import { useUseCase } from '@/core/hooks/use-use-case'
import { DestinationDeleteCmd } from '@/features/destination/destination-delete/application/destination-delete.cmd'

export const DestinationSelector: FC<{ destinations: Destination[] }> = ({ destinations }) => {
  const router = useRouter()
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [selectedShip, setSelectedShip] = useState<ShipType>('classic')

  const [destinationDeleteCmd] = useUseCase(DestinationDeleteCmd)

  const handlePlanTrip = () => {
    if (selectedDestination) {
      // Navigate to trip results page instead of calling callback
      router.push(`/trip/${selectedDestination.id}/${selectedShip}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            <span className="text-white">/</span>Select Destination
          </h2>
          <Button onClick={() => router.push('/destinations/new')} variant="outline" className="hover:bg-accent/20">
            + Create New Destination
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
              <CardAction>
                <Button
                  data-testid="destination-delete"
                  onClick={async () => {
                    await destinationDeleteCmd(destination.id, {
                      confirm: 'Are you sure you want to delete this destination?',
                    })
                    router.refresh()
                  }}
                >
                  <Trash />
                </Button>
              </CardAction>
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
