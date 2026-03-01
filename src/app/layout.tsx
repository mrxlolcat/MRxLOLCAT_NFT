import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RootClientLayout } from '@/components/RootClientLayout'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const APP_URL = process.env.NEXT_PUBLIC_VERCEL_URL 
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
  : "https://mrxlolcat-nft.vercel.app";

const miniAppConfig = {
  version: "1",
  imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
  button: {
    title: "Launch MRxLOLCAT",
    action: {
      type: "launch_frame",
      name: "MRxLOLCAT GENESIS",
      url: APP_URL,
      splashImageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
      splashBackgroundColor: "#020617",
    },
  },
};

const stringifiedConfig = JSON.stringify(miniAppConfig);

export const metadata: Metadata = {
  title: 'MRxLOLCAT GENESIS NFT Airdrop Portal',
  description: 'MRxLOLCAT NFT is your premium gateway to Base. Mint your NFT Collection to unlock gasless experiences and airdrop priority.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'MRxLOLCAT GENESIS NFT Airdrop Portal',
    description: 'Mint your NFT Collection to unlock exclusive Base ecosystem rewards and airdrop priority access.',
    url: APP_URL,
    siteName: 'MRxLOLCAT GENESIS',
    images: [
      {
        url: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
        width: 1200,
        height: 800,
        alt: 'MRxLOLCAT GENESIS Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  other: {
    "base:app_id": "69a11773dce51e894f97278f",
    "fc:miniapp": stringifiedConfig,
    "fc:frame": stringifiedConfig,
    "fc:frame:image": "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
    "fc:frame:button:1": "Launch MRxLOLCAT",
    "fc:frame:button:1:action": "post_redirect",
  },
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable}`}>
      <body className="antialiased font-sans bg-black text-white">
        <RootClientLayout>
          {children}
        </RootClientLayout>
      </body>
    </html>
  )
}
