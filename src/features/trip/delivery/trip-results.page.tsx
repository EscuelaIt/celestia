import { type FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Trip } from '@/features/trip/domain/trip'
import { calculateTripCmd, useCaseService } from '@/core/dependency-injection/app-container'
import { SpaceBackground } from '@/core/components/space-background'
import { Badge } from '@/core/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'

export const TripResultsPage: FC<{ calculateTrip: CalculateTrip }> = ({
  calculateTrip: { destinationId, shipType },
}) => {
  const router = useRouter()
  const [tripData, setTripData] = useState<Trip | null>(null)

  useEffect(() => {
    const fetchTripData = async () => {
      const trip = await useCaseService.execute(calculateTripCmd, { destinationId, shipType })
      setTripData(trip)
    }

    if (destinationId && shipType) {
      fetchTripData()
    }
  }, [destinationId, shipType])

  const formatTime = (days: number) => {
    if (days < 30) return `${days} days`
    if (days < 365) return `${Math.ceil(days / 30)} months`
    return `${(days / 365).toFixed(1)} years`
  }

  const handleNewTrip = () => {
    router.push('/')
  }

  if (tripData === null) {
    return
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2 text-foreground">
                <span className="text-white">/</span>Trip Plan
              </h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl animate-float">{tripData.destination.emoji}</span>
                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Destination: {tripData.destination.name}
                  </h3>
                  <Badge variant="outline" className="text-sm">
                    {shipType === 'classic' ? '🚀 Classic Rocket' : '🛸 Advanced Ship'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-primary">📏</span>
                    Distance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {tripData.destination.distance.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">million km</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-accent">⏱️</span>
                    Travel Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{formatTime(tripData.travelTime)}</div>
                  <div className="text-sm text-muted-foreground">{tripData.travelTime} exact days</div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-chart-2">⚡</span>
                    Average Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-2">{tripData.averageSpeed.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">km/h</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleNewTrip}
              className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <span className="text-white">/</span>Plan New Trip
            </button>
          </div>
        </div>

        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">Exploring the cosmos, one journey at a time ✨</p>
        </footer>
      </div>
    </div>
  )
}
