'use client'

import type { FC } from 'react'
import { useSuccessListener } from '@/core/react/use-success-listener'

/**
 * Component that listens for success events and displays toast notifications.
 * This component should be included in the application layout.
 */
export const SuccessDisplay: FC = () => {
  useSuccessListener()

  // This component doesn't render anything
  return null
}
