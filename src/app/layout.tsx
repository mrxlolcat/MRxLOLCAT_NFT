import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'MRxLOLCAT NFT Minter',
  description: 'Official Genesis Collection on Base Mainnet.',
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
    "fc:frame:button:1": "Mint NFT",
  },
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
