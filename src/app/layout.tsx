import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MRxLOLCAT NFT",
  description: "Farcaster Mini App Minter",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
    "fc:frame:button:1": "🐱 Connect Wallet",
    "fc:frame:button:2": "✨ Mint NFT Gratis",
    "fc:frame:button:3": "🎁 Claim 1000 LOLCAT",
    "fc:frame:post_url": "https://mrxlolcat-nft.vercel.app/api/connect",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
