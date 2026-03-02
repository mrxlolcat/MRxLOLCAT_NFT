'use client';

import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { base } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";

// Konfigurasi dompet: Menggunakan createWallet dengan ID yang benar untuk Farcaster
const wallets = [
  createWallet("app.farcaster"), // Dompet Internal Farcaster
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("com.coinbase.wallet"),
  createWallet("io.rabby"),
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#111111]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black italic tracking-tighter text-white uppercase">
            MRx<span className="text-accent">LOL</span>CAT
          </span>
        </div>
        
        <ConnectButton
          client={client}
          chain={base}
          wallets={wallets}
          autoConnect={true}
          connectModal={{ 
            size: "compact",
            title: "Choose Wallet",
            showThirdwebBranding: false,
          }}
          connectButton={{
            label: "Connect",
            className: "!bg-white !text-black !font-black !px-6 !py-2.5 !rounded-xl !text-xs !uppercase !tracking-widest hover:!bg-zinc-200 transition-all shadow-lg shadow-white/5",
          }}
          theme="dark"
        />
      </div>
    </nav>
  );
}
