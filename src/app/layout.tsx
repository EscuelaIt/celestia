import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import type { ReactNode } from 'react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { SuccessDisplay } from '@/components/success-display'
import { Toaster } from '@/components/ui/sonner'
import { ErrorDisplay } from '@/components/error-display'

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
        {children}
        <ConfirmDialog />
        <SuccessDisplay />
        <ErrorDisplay />
        <Toaster />
      </body>
    </html>
  )
}
