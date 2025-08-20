'use client'

import { SpaceBackground } from '@/components/space-background'
import { DestinationSelector } from '@/components/destination-selector'

export default function CelestiaApp() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground tracking-tight">
            <span className="text-white">/</span>Celestia
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
          <DestinationSelector />
        </main>

        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">Exploring the cosmos, one journey at a time ✨</p>
        </footer>
      </div>
    </div>
  )
}
