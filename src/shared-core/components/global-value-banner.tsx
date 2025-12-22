'use client'

import { useGlobalValue } from '@/shared-core/context/global-value'

export function GlobalValueBanner() {
  const { value } = useGlobalValue()
  return (
    <div className="mt-3 text-sm text-muted-foreground" aria-live="polite">
      {value}
    </div>
  )
}
