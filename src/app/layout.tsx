import type { Metadata } from 'next';
import './globals.css';
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from '@/components/Navbar';
import { Toaster } from "sonner";
import FarcasterSDKProvider from '@/components/FarcasterSDKProvider';

export const metadata: Metadata = {
  title: 'MRxLOLCAT_NFT',
  description: 'MRxLOLCAT Genesis Collection on Base',
  openGraph: {
    title: 'MRxLOLCAT NFT',
    description: 'MRxLOLCAT Genesis Collection on Base',
    images: ['https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg'],
    url: 'https://mrxlolcat-nft.vercel.app/',
  },
  other: {
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
      button: {
        title: "Launch MRxLOLCAT",
        action: {
          type: "launch_miniapp",
          name: "MRxLOLCAT_NFT",
          url: "https://mrxlolcat-nft.vercel.app/",
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
          url: "https://mrxlolcat-nft.vercel.app/",
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
          </ThirdwebProvider>
        </FarcasterSDKProvider>
      </body>
    </html>
  );
}
