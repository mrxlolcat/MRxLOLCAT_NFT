import type { Metadata } from 'next'
import './globals.css'
import { RootProviders } from '@/components/RootProviders'

export const metadata: Metadata = {
  title: 'MRxLOLCAT Genesis Vibes',
  description: 'Digital Collectibles on Base Network.',
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-white">
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  )
}
