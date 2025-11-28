import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import type { ReactNode } from 'react'
import { ErrorDisplay } from '@/shared-core/components/error-display'
import { SuccessDisplay } from '@/shared-core/components/success-display'
import { ConfirmDialog } from '@/shared-core/components/confirm-dialog'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Celestia',
  description: 'Exploring the cosmos, one journey at a time ✨',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorDisplay />
        <SuccessDisplay />
        <ConfirmDialog />
        {children}
      </body>
    </html>
  )
}
