import { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { SpaceBackground } from '@/core/components/space-background'
import { DestinationCreateForm } from '@/features/destination/destination-create/delivery/destination-create-form'

export const DestinationCreatePage: FC = () => {
  const router = useRouter()

  const handleCreated = () => {
    router.push('/')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← Back
          </button>
        </div>
        <DestinationCreateForm onDestinationCreated={handleCreated} onCancel={handleCancel} />
      </div>
    </div>
  )
}
