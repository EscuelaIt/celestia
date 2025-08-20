'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SpaceBackground } from '@/components/space-background'

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

export default function TripResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [tripData, setTripData] = useState<TripCalculation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const destinationId = params.destinationId as string
  const shipType = params.shipType as 'classic' | 'advanced'

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await fetch('/api/calculate-trip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destinationId,
            shipType,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to calculate trip')
        }

        const data = await response.json()
        setTripData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
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

  const getResourceColor = (amount: number, type: string) => {
    if (type === 'water' && amount > 1000) return 'text-destructive'
    if (type === 'oxygen' && amount > 300) return 'text-destructive'
    if (type === 'food' && amount > 800) return 'text-destructive'
    return 'text-accent'
  }

  const handleNewTrip = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <SpaceBackground />
        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Calculating trip...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !tripData) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <SpaceBackground />
        <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-destructive">Error</h2>
            <p className="text-muted-foreground mb-4">{error || 'Failed to load trip data'}</p>
            <button
              onClick={handleNewTrip}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    )
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

            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="text-white">/</span>Required Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium">💧 Water</span>
                      <span className={`font-bold ${getResourceColor(tripData.totalWater, 'water')}`}>
                        {tripData.totalWater.toLocaleString()} L
                      </span>
                    </div>
                    <Progress value={Math.min((tripData.totalWater / 2000) * 100, 100)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {tripData.destination.resources.water} L/day × {tripData.travelTime} days
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium">🫁 Oxygen</span>
                      <span className={`font-bold ${getResourceColor(tripData.totalOxygen, 'oxygen')}`}>
                        {tripData.totalOxygen.toLocaleString()} kg
                      </span>
                    </div>
                    <Progress value={Math.min((tripData.totalOxygen / 500) * 100, 100)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {tripData.destination.resources.oxygen} kg/day × {tripData.travelTime} days
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium">🍽️ Food</span>
                      <span className={`font-bold ${getResourceColor(tripData.totalFood, 'food')}`}>
                        {tripData.totalFood.toLocaleString()} kg
                      </span>
                    </div>
                    <Progress value={Math.min((tripData.totalFood / 1000) * 100, 100)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {tripData.destination.resources.food} kg/day × {tripData.travelTime} days
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated total load:</span>
                    <span className="font-bold text-foreground">{tripData.totalLoad.toLocaleString()} kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
