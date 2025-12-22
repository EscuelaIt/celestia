'use client'

import type { FC } from 'react'
import { useErrorListener } from '@/core/react/use-error-listener'

/**
 * Component that listens for error events and displays toast notifications.
 * This component should be included in the application layout.
 */
export const ErrorDisplay: FC = () => {
  useErrorListener()

  // This component doesn't render anything
  return null
}
