'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

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

interface TripResultsProps {
  destination: Destination
  shipType: 'classic' | 'advanced'
}

export function TripResults({ destination, shipType }: TripResultsProps) {
  const travelTime = destination.travelTime[shipType]
  const totalWater = Math.ceil(destination.resources.water * travelTime)
  const totalOxygen = Math.ceil(destination.resources.oxygen * travelTime)
  const totalFood = Math.ceil(destination.resources.food * travelTime)

  const formatTime = (days: number) => {
    if (days < 30) return `${days} días`
    if (days < 365) return `${Math.ceil(days / 30)} meses`
    return `${(days / 365).toFixed(1)} años`
  }

  const getResourceColor = (amount: number, type: string) => {
    if (type === 'water' && amount > 1000) return 'text-destructive'
    if (type === 'oxygen' && amount > 300) return 'text-destructive'
    if (type === 'food' && amount > 800) return 'text-destructive'
    return 'text-accent'
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          <span className="text-accent">/</span>Plan de Viaje
        </h2>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-4xl animate-float">{destination.emoji}</span>
          <div>
            <h3 className="text-2xl font-semibold text-card-foreground">Destino: {destination.name}</h3>
            <Badge variant="outline" className="text-sm">
              {shipType === 'classic' ? '🚀 Cohete Clásico' : '🛸 Nave Avanzada'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-primary">📏</span>
              Distancia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{destination.distance.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">millones de km</div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-accent">⏱️</span>
              Tiempo de Viaje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{formatTime(travelTime)}</div>
            <div className="text-sm text-muted-foreground">{travelTime} días exactos</div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-chart-2">⚡</span>
              Velocidad Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {Math.round((destination.distance * 1000000) / (travelTime * 24))}
            </div>
            <div className="text-sm text-muted-foreground">km/h</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-accent">/</span>Recursos Necesarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">💧 Agua</span>
                <span className={`font-bold ${getResourceColor(totalWater, 'water')}`}>
                  {totalWater.toLocaleString()} L
                </span>
              </div>
              <Progress value={Math.min((totalWater / 2000) * 100, 100)} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {destination.resources.water} L/día × {travelTime} días
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">🫁 Oxígeno</span>
                <span className={`font-bold ${getResourceColor(totalOxygen, 'oxygen')}`}>
                  {totalOxygen.toLocaleString()} kg
                </span>
              </div>
              <Progress value={Math.min((totalOxygen / 500) * 100, 100)} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {destination.resources.oxygen} kg/día × {travelTime} días
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">🍽️ Comida</span>
                <span className={`font-bold ${getResourceColor(totalFood, 'food')}`}>
                  {totalFood.toLocaleString()} kg
                </span>
              </div>
              <Progress value={Math.min((totalFood / 1000) * 100, 100)} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {destination.resources.food} kg/día × {travelTime} días
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Carga total estimada:</span>
              <span className="font-bold text-foreground">
                {(totalWater + totalOxygen + totalFood).toLocaleString()} kg
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
