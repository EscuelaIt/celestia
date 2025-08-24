'use client'

import { XCircle } from 'lucide-react'
import type { FC } from 'react'
import { useErrorListener } from '@/core/components/use-error-listener'
import { Alert, AlertDescription, AlertTitle } from '@/core/components/ui/alert'
import { Button } from '@/core/components/ui/button'

export const ErrorDisplay: FC = () => {
  const { error, clearError } = useErrorListener()

  if (!error) {
    return null
  }

  return (
    <Alert variant="destructive" className="z-40 max-w-sm absolute right-0 bottom-0">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <Button variant="outline" onClick={clearError} className="mt-2">
        Dismiss
      </Button>
    </Alert>
  )
}
