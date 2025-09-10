import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VC Briefing',
  description: 'Summarize pitch decks and generate VC briefs instantly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="min-h-full text-gray-900 antialiased">{children}</body>
    </html>
  )
}

