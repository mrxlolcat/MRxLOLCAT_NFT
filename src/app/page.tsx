'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ShieldCheck, Rocket, CheckCircle2, Share2, Wallet, ExternalLink, Info
} from 'lucide-react';
import { 
  useActiveAccount, 
  useReadContract,
  TransactionButton,
  NFTProvider,
  NFTMedia,
  NFTName,
  NFTDescription,
} from 'thirdweb/react';
import { claimTo } from "thirdweb/extensions/erc1155";
import { nftContract } from "@/lib/thirdweb-client";
import { WalletConnector } from "@/components/WalletConnector";
import confetti from "canvas-confetti";
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

  const shareToWarpcast = () => {
    const text = `I just minted an NFT from the MRxLOLCAT Collection on Base! Join the collection at @mrxlolcat`;
    const url = "https://mrxlolcat-nft.vercel.app";
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`;
    window.open(castUrl, "_blank");
  };

  if (!mounted) return <main className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative cyber-grid">
      <Toaster position="top-center" richColors theme="dark" />
      
      {/* Background Decorative */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00f2ff]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff69b4]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="glass-card rounded-[32px] p-6 flex flex-col gap-6 shadow-2xl">
          
          {/* Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-[#00f2ff]" fill="currentColor" />
              <span className="font-black text-white tracking-tighter uppercase">MRxLOLCAT</span>
            </div>
            <WalletConnector />
          </header>

          {/* NFT Showcase */}
          <NFTProvider contract={nftContract} tokenId={0n}>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 group bg-black/40">
              <NFTMedia className="object-cover w-full h-full animate-float" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-left">
                <span className="bg-white/10 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-white/10 mb-2 inline-block">Official Collection</span>
                <NFTName className="text-2xl font-black italic uppercase text-white tracking-tighter" />
                <NFTDescription className="text-[10px] text-zinc-500 line-clamp-1" />
              </div>
            </div>
          </NFTProvider>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
              <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-1">Supply</p>
              <p className="text-xl font-black text-white">{totalSupply?.toString() || "0"} <span className="text-[10px] opacity-20">/ 10K</span></p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-center">
              <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-1">Price</p>
              <p className="text-xl font-black text-[#00f2ff]">FREE</p>
            </div>
          </div>

          {/* Action Zone */}
          <div className="space-y-4">
            {balance && balance > 0n ? (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-4">
                  <CheckCircle2 className="text-emerald-400" size={24} />
                  <div>
                    <p className="font-black text-xs text-white uppercase">Ownership Verified</p>
                    <p className="text-[8px] text-emerald-400/60 font-bold uppercase">Asset exists in wallet</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={shareToWarpcast} className="bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    <Share2 size={12} /> Share
                  </button>
                  <a href={`https://basescan.org/address/0xba968fA5d5255d6D95bD23D69bA63De13ceFF731`} target="_blank" className="bg-white/5 border border-white/10 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                    <ExternalLink size={12} /> Explorer
                  </a>
                </div>
              </div>
            ) : account ? (
              <TransactionButton
                transaction={() => claimTo({
                  contract: nftContract,
                  to: account.address,
                  tokenId: 0n,
                  quantity: 1n,
                })}
                onTransactionConfirmed={() => {
                  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f2ff', '#ff69b4'] });
                  toast.success("Mint Successful!");
                }}
                onError={(err) => toast.error("Transaction Reverted: " + err.message)}
                className="!w-full !bg-gradient-to-r !from-[#ff69b4] !to-[#9370db] !text-white !font-black !py-5 !rounded-2xl !text-xs !uppercase !tracking-[0.2em] !shadow-lg shine-sweep"
              >
                MINT NFT
              </TransactionButton>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/10 p-8 rounded-3xl text-center">
                <Wallet className="mx-auto text-zinc-700 mb-2 opacity-50" size={32} />
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Connect Wallet to Participate</p>
                <div className="flex justify-center"><WalletConnector /></div>
              </div>
            )}
          </div>

          {/* Footer Technical */}
          <footer className="pt-2 border-t border-white/5 flex flex-col items-center gap-2 opacity-20">
            <div className="flex items-center gap-2 text-[8px] font-mono tracking-tighter">
              <ShieldCheck size={10} /> 0xba968fA5d5255d6D95bD23D69bA63De13ceFF731
            </div>
            <p className="text-[8px] font-black tracking-[0.5em] uppercase text-white">MRxLOLCAT Collection</p>
          </footer>

        </div>
      </motion.div>
    </main>
  );
}
