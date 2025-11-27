'use client'

import { type FormEvent, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CreateDestinationCmd } from '@/features/destination/destination-create/application/create-destination.cmd'
import { useUseCase } from '@/core/container/use-use-case'

interface AddDestinationFormProps {
  onDestinationAdded: () => void
  onCancel: () => void
}

type CreateDestinationForm = {
  name: string
  distance: string
  description: string
  classicTravelTime: string
  advancedTravelTime: string
  emoji: string
}

export function AddDestinationForm({ onDestinationAdded, onCancel }: AddDestinationFormProps) {
  const [formData, setFormData] = useState<CreateDestinationForm>({
    name: '',
    distance: '',
    description: '',
    classicTravelTime: '',
    advancedTravelTime: '',
    emoji: '',
  })

  const createDestinationCmd = useUseCase(CreateDestinationCmd)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (
      !formData.name ||
      !formData.distance ||
      !formData.description ||
      !formData.classicTravelTime ||
      !formData.advancedTravelTime ||
      !formData.emoji
    ) {
      throw new Error('All fields are required')
    }

    const distance = parseFloat(formData.distance)
    const classicTravelTime = parseInt(formData.classicTravelTime)
    const advancedTravelTime = parseInt(formData.advancedTravelTime)

    if (isNaN(distance) || distance <= 0) {
      throw new Error('Distance must be a positive number')
    }

    if (isNaN(classicTravelTime) || classicTravelTime <= 0) {
      throw new Error('Classic travel time must be a positive number')
    }

    if (isNaN(advancedTravelTime) || advancedTravelTime <= 0) {
      throw new Error('Advanced travel time must be a positive number')
    }

    if (advancedTravelTime >= classicTravelTime) {
      throw new Error('Advanced travel time must be less than classic travel time')
    }

    const newDestination = {
      name: formData.name.trim(),
      distance,
      description: formData.description.trim(),
      travelTime: {
        classic: classicTravelTime,
        advanced: advancedTravelTime,
      },
      emoji: formData.emoji.trim(),
    }

    await createDestinationCmd.execute(newDestination, {
      confirm: 'Are you sure?',
      success: 'Destination added successfully.',
    })

    onDestinationAdded()
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="text-white">/</span>Add New Destination
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="e.g., Saturn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                value={formData.emoji}
                onChange={e => handleInputChange('emoji', e.target.value)}
                placeholder="e.g., 🪐"
                maxLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance">Distance (million km)</Label>
              <Input
                id="distance"
                type="number"
                step="0.001"
                min="0"
                value={formData.distance}
                onChange={e => handleInputChange('distance', e.target.value)}
                placeholder="e.g., 1275"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classicTravelTime">Classic Travel Time (days)</Label>
              <Input
                id="classicTravelTime"
                type="number"
                min="1"
                value={formData.classicTravelTime}
                onChange={e => handleInputChange('classicTravelTime', e.target.value)}
                placeholder="e.g., 900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advancedTravelTime">Advanced Travel Time (days)</Label>
              <Input
                id="advancedTravelTime"
                type="number"
                min="1"
                value={formData.advancedTravelTime}
                onChange={e => handleInputChange('advancedTravelTime', e.target.value)}
                placeholder="e.g., 450"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              placeholder="e.g., The ringed giant with beautiful ice formations"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
              Add Destination
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
