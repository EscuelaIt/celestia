'use client'

import { createContext, useContext, type ReactNode } from 'react'

const DEFAULT_GLOBAL_VALUE = '🚀 Welcome aboard, traveler!'

interface GlobalValueContextType {
  value: string
}

const GlobalValueContext = createContext<GlobalValueContextType | undefined>(undefined)

export function GlobalValueProvider({ children }: { children: ReactNode }) {
  const ctx: GlobalValueContextType = { value: DEFAULT_GLOBAL_VALUE }
  return <GlobalValueContext.Provider value={ctx}>{children}</GlobalValueContext.Provider>
}

export function useGlobalValue() {
  const ctx = useContext(GlobalValueContext)
  if (!ctx) {
    throw new Error('useGlobalValue must be used within GlobalValueProvider')
  }
  return ctx
}
