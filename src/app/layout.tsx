import type { Metadata } from 'next';
import './globals.css';
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from '@/components/Navbar';
import { Toaster } from "sonner";
import FarcasterSDKProvider from '@/components/FarcasterSDKProvider';

export const metadata: Metadata = {
  title: 'MRxLOLCAT_NFT',
  description: 'MRxLOLCAT Genesis Collection on Base',
  other: {
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
      frame: {
        version: "1",
        name: "MRxLOLCAT_NFT",
        iconUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
        homeUrl: "https://mrxlolcat-nft.vercel.app/",
        imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
        buttonTitle: "Launch MRxLOLCAT",
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
