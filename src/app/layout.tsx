import type { Metadata } from 'next';
import './globals.css';
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from '@/components/Navbar';
import { Toaster } from "sonner";
import FarcasterSDKProvider from '@/components/FarcasterSDKProvider';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mrxlolcat-nft.vercel.app";

export const metadata: Metadata = {
  title: 'MRxLOLCAT_NFT',
  description: 'MRxLOLCAT Genesis Collection on Base',
  icons: {
    icon: 'https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg',
    apple: 'https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg',
  },
  openGraph: {
    title: 'MRxLOLCAT NFT',
    description: 'MRxLOLCAT Genesis Collection on Base',
    images: ['https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg'],
    url: appUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MRxLOLCAT NFT',
    description: 'MRxLOLCAT Genesis Collection on Base',
    images: ['https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg'],
  },
  other: {
    "talentapp:project_verification": "ee7d3ed671fc42bd170353248f7fcd7495edd2211c95612ca58fc014fa4a1334dba6d5fcd83b4d34b75172cbf6c8b158e7189111a4fb59e8b10fb36fe29457e8",
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
      button: {
        title: "Launch MRxLOLCAT",
        action: {
          type: "launch_miniapp",
          name: "MRxLOLCAT_NFT",
          url: appUrl,
        },
      },
    }),
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
      button: {
        title: "Launch MRxLOLCAT",
        action: {
          type: "launch_miniapp",
          name: "MRxLOLCAT_NFT",
          url: appUrl,
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#111111] text-white cyber-grid min-h-screen">
        <FarcasterSDKProvider>
          <ThirdwebProvider>
            <Toaster position="bottom-right" richColors theme="dark" />
            <Navbar />
            {children}
            <Analytics />
            <SpeedInsights />
          </ThirdwebProvider>
        </FarcasterSDKProvider>
      </body>
    </html>
  );
}
