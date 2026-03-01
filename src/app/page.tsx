'use client';

import React, { useState, useEffect } from "react";
import { 
  Zap, ShieldCheck, Rocket, CheckCircle2, Share2, Wallet, ExternalLink, Loader2, Info
} from 'lucide-react';
import { 
  useActiveAccount, 
  useReadContract,
  TransactionButton,
  NFTProvider,
  NFTMedia,
  NFTName,
  NFTDescription
} from 'thirdweb/react';
import { claimTo } from "thirdweb/extensions/erc1155";
import { nftContract, client } from "@/lib/thirdweb-client";
import { WalletConnector } from "@/components/WalletConnector";
import { base } from "thirdweb/chains";
import { toast, Toaster } from "sonner";

export default function MRxLOLCATBaseApp() {
  const account = useActiveAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: totalSupply } = useReadContract({
    contract: nftContract,
    method: "function totalSupply(uint256 id) view returns (uint256)",
    params: [0n],
  });

  const { data: balance } = useReadContract({
    contract: nftContract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000", 0n],
  });

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 cyber-grid">
      <Toaster position="top-center" richColors theme="dark" />
      
      <div className="w-full max-w-[420px] bg-[#111111] border border-zinc-800 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-matrix-blue" fill="currentColor" />
            <span className="font-black tracking-tighter text-lg">MRxLOLCAT</span>
          </div>
          <WalletConnector />
        </header>

        {/* NFT Media */}
        <NFTProvider contract={nftContract} tokenId={0n}>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black">
            <NFTMedia className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4">
              <NFTName className="text-xl font-black italic uppercase glow-blue" />
              <NFTDescription className="text-[10px] text-zinc-500 line-clamp-1" />
            </div>
          </div>
        </NFTProvider>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
            <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Supply</p>
            <p className="font-black text-white">{totalSupply?.toString() || "0"} <span className="opacity-20">/ 10k</span></p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
            <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Price</p>
            <p className="font-black text-matrix-blue">FREE</p>
          </div>
        </div>

        {/* Main Action */}
        <div className="space-y-4">
          {!account ? (
            <div className="bg-zinc-900/50 border border-dashed border-zinc-800 p-8 rounded-2xl text-center">
              <Wallet className="mx-auto text-zinc-700 mb-2" size={24} />
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-4">Connect wallet to mint</p>
              <div className="flex justify-center scale-110"><WalletConnector /></div>
            </div>
          ) : (balance && balance > 0n) ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <div>
                <p className="text-xs font-black uppercase">Asset Secured</p>
                <a 
                  href={`https://basescan.org/address/0xba968fA5d5255d6D95bD23D69bA63De13ceFF731`} 
                  target="_blank"
                  className="text-[10px] text-emerald-400 underline"
                >
                  View on Explorer
                </a>
              </div>
            </div>
          ) : (
            <TransactionButton
              transaction={() => claimTo({
                contract: nftContract,
                to: account.address,
                tokenId: 0n,
                quantity: 1n,
              })}
              onTransactionConfirmed={() => toast.success("Mint Successful!")}
              onError={(err) => toast.error("Mint failed: " + err.message)}
              className="!w-full !bg-matrix-blue !text-black !font-black !py-4 !rounded-xl !text-sm !uppercase !tracking-widest hover:!opacity-90 transition-opacity"
            >
              MINT NFT
            </TransactionButton>
          )}
        </div>

        <footer className="flex items-center justify-center gap-2 opacity-20">
          <Info size={10} />
          <p className="text-[8px] font-mono tracking-widest uppercase">Base Mainnet Active</p>
        </footer>

      </div>
    </main>
  );
}
