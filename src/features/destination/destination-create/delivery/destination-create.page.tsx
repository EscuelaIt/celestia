import { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { DestinationCreateForm } from '@/features/destination/destination-create/delivery/destination-create-form'
import { Page } from '@/core/components/page'

export const DestinationCreatePage: FC = () => {
  const router = useRouter()

  const handleCreated = () => {
    router.push('/')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Page>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          ← Back
        </button>
      </div>
      <DestinationCreateForm onDestinationCreated={handleCreated} onCancel={handleCancel} />
    </Page>
  )
}
