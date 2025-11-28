'use client'

import type { FC } from 'react'
import { useSuccessListener } from '@/shared-core/hooks/use-success-listener'
import { Toaster } from '@/core/components/ui/sonner'

export const SuccessDisplay: FC = () => {
  useSuccessListener()

  return <Toaster position="top-right" />
}
