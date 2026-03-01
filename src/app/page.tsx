'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ShieldCheck, Rocket, CheckCircle2, Info, Share2, Wallet
} from 'lucide-react';
import { 
  useActiveAccount, 
  useReadContract,
  TransactionButton
} from 'thirdweb/react';
import { claimTo } from "thirdweb/extensions/erc1155";
import { nftContract } from "@/lib/thirdweb-client";
import { WalletConnector } from "@/components/WalletConnector";
import confetti from "canvas-confetti";

export default function MRxLOLCATBaseApp() {
  const account = useActiveAccount();
  const [mounted, setMounted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Live Supply from Contract
  const { data: totalSupply, isLoading: loadingSupply } = useReadContract({
    contract: nftContract,
    method: "function totalSupply(uint256 id) view returns (uint256)",
    params: [0n],
  });

  // Balance Check
  const { data: balance } = useReadContract({
    contract: nftContract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000", 0n],
  });

  const shareToWarpcast = () => {
    const text = `I just secured my MRxLOLCAT Genesis Pass on Base! 🚀 Join the wave at @mrxlolcat`;
    const url = "https://mrxlolcat-nft.vercel.app";
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`;
    window.open(castUrl, "_blank");
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-16 overflow-hidden max-w-[430px] mx-auto relative">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full cyber-grid" />
      </div>

      <header className="sticky top-0 z-50 px-4 py-4 backdrop-blur-xl border-b border-white/5 bg-[#020617]/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="text-white fill-current" size={16} />
          </div>
          <div className="text-left">
            <h1 className="font-black text-sm tracking-tighter text-white leading-none">MRxLOLCAT</h1>
            <p className="text-[7px] font-black text-secondary uppercase tracking-widest mt-0.5">Base Protocol</p>
          </div>
        </div>
        <WalletConnector />
      </header>

      <div className="relative z-10 px-4 pt-6 space-y-8 pb-20">
        
        {/* NFT Hero */}
        <section className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square w-full bg-[#0f172a] rounded-[32px] overflow-hidden border-2 border-white/5 shadow-2xl"
          >
            <Image 
              src="https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg" 
              alt="NFT" 
              fill 
              className="object-cover animate-float-slow" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/20 text-primary text-[8px] font-black px-2 py-0.5 rounded-md border border-primary/20 uppercase tracking-widest">Legendary Pass</span>
              </div>
              <h2 className="text-3xl font-black italic uppercase text-white leading-none tracking-tighter">Genesis Protocol</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Supply</p>
              <p className="text-xl font-black text-white">{loadingSupply ? '...' : (totalSupply?.toString() || '0')} <span className="text-[10px] opacity-30 font-normal">/ 10,000</span></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Mint Price</p>
              <p className="text-xl font-black text-secondary uppercase">Free</p>
            </div>
          </div>
        </section>

        {/* Action Area */}
        <section className="bg-white/5 border border-white/10 rounded-[32px] p-6 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]">
              <ShieldCheck size={14} /> Security Verified
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
              Initialization of the Genesis Pass will grant priority access to protocol nodes and $SHELL allocations.
            </p>
          </div>

          <div className="space-y-4">
            {balance && balance > 0n ? (
              <div className="space-y-3">
                <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-2xl flex items-center gap-4">
                  <CheckCircle2 className="text-secondary" size={24} />
                  <div>
                    <p className="font-black text-sm text-white uppercase italic tracking-tight">Access Granted</p>
                    <p className="text-[9px] text-secondary font-bold uppercase tracking-widest">Genesis Pass Secured</p>
                  </div>
                </div>
                <button onClick={shareToWarpcast} className="w-full bg-white text-black font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2">
                  <Share2 size={14} /> Share Protocol Access
                </button>
              </div>
            ) : account ? (
              <TransactionButton
                transaction={() => claimTo({
                  contract: nftContract,
                  to: account.address,
                  tokenId: 0n,
                  quantity: 1n,
                })}
                onTransactionConfirmed={(res) => {
                  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                  setTxHash(res.transactionHash);
                }}
                onError={(err) => alert("Mint failed: " + err.message)}
                className="!w-full !bg-gradient-to-r !from-primary !to-secondary !text-white !font-black !py-5 !rounded-2xl !text-sm !uppercase !tracking-[0.2em] !shadow-neon-purple !border-none hover:!scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Rocket size={18} fill="currentColor" />
                  Initialize Genesis Mint
                </div>
              </TransactionButton>
            ) : (
              <div className="text-center p-8 border border-dashed border-white/10 rounded-2xl">
                <Wallet className="mx-auto text-slate-600 mb-3" size={32} />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic mb-4">Authorization Required</p>
                <WalletConnector />
              </div>
            )}
          </div>
        </section>

        {/* Footer Technical */}
        <footer className="pt-4 flex flex-col items-center gap-4 opacity-40">
          <div className="flex items-center gap-2 text-[8px] font-mono">
            <Info size={10} /> 0xba968fA5d5255d6D95bD23D69bA63De13ceFF731
          </div>
          <p className="text-[8px] font-black tracking-[0.5em] uppercase">Executed by MRxLOLCAT</p>
        </footer>

      </div>
    </main>
  );
}
