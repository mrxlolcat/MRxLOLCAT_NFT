'use client';

import React, { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ShieldCheck, Rocket, CheckCircle2, Info, Share2, Wallet, Lock, ExternalLink, Loader2
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
import { darkTheme } from "thirdweb/react";
import confetti from "canvas-confetti";
import { toast, Toaster } from "sonner";

// Component: Animated Counter
const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
    const start = displayValue;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// Component: Skeleton Loader
const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-white/5 animate-pulse rounded ${className}`} />
);

export default function MRxLOLCATBaseApp() {
  const account = useActiveAccount();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

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
  const { data: balance, isLoading: loadingBalance } = useReadContract({
    contract: nftContract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000", 0n],
  });

  useEffect(() => {
    if (!account) {
      setStep(1);
    } else if (balance && balance > 0n) {
      setStep(3);
    } else if (account) {
      setStep(2);
    }
  }, [account, balance]);

  const shareToWarpcast = () => {
    const text = `I just secured my MRxLOLCAT Genesis Pass on Base! Join the collection at @mrxlolcat`;
    const url = "https://mrxlolcat-nft.vercel.app";
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`;
    window.open(castUrl, "_blank");
    toast.success("Redirecting to Warpcast...");
  };

  if (!mounted) return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader2 className="animate-spin text-matrix-blue" size={32} />
    </main>
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative matrix-bg selection:bg-matrix-blue selection:text-black">
      <Toaster position="top-center" expand={true} richColors theme="dark" />
      
      {/* Optimized Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-matrix-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lolcat-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[450px] relative z-10"
      >
        <div className="glass-card rounded-[32px] p-6 shadow-glass flex flex-col gap-6 overflow-hidden">
          
          {/* Hero Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-matrix-blue to-lolcat-purple rounded-xl flex items-center justify-center shadow-neon-blue">
                <Zap size={16} className="text-black" fill="currentColor" />
              </div>
              <div>
                <h1 className="font-black text-sm tracking-tight text-white uppercase leading-none">MRxLOLCAT</h1>
                <p className="text-[7px] font-bold text-matrix-blue tracking-[0.2em] mt-1 uppercase">Protocol Active</p>
              </div>
            </div>
            <div className="scale-90 origin-right">
              <WalletConnector />
            </div>
          </header>

          {/* NFT Media Section */}
          <NFTProvider contract={nftContract} tokenId={0n}>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-matrix-blue/20 bg-black/40 group">
              <NFTMedia 
                className="object-cover w-full h-full animate-float-slow transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                <span className="bg-matrix-blue text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter w-fit shadow-neon-blue">Base Mainnet</span>
                <NFTName 
                  className="text-2xl font-black italic uppercase text-white leading-tight tracking-tighter glow-blue"
                  loadingComponent={<Skeleton className="h-6 w-32" />}
                />
              </div>
            </div>
          </NFTProvider>

          {/* Supply & Price Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">Current Supply</p>
              <p className="text-xl font-black text-white">
                {loadingSupply ? <Skeleton className="h-6 w-full" /> : <><AnimatedCounter value={Number(totalSupply || 0)} /> <span className="text-[10px] opacity-30 font-normal">/ 10,000</span></>}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">Mint Price</p>
              <p className="text-xl font-black text-matrix-blue uppercase">FREE</p>
            </div>
          </div>

          {/* Sequential Logic Flow */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              {/* Step 1: Identity */}
              <motion.div 
                key="step1"
                className={`p-4 rounded-2xl border transition-all ${step >= 1 ? 'border-matrix-blue/20 bg-matrix-blue/5' : 'border-white/5 opacity-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-matrix-blue font-mono">01.</span>
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Identity Verification</span>
                  </div>
                  {step > 1 ? <CheckCircle2 size={14} className="text-matrix-blue" /> : <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue animate-pulse" />}
                </div>
                {step === 1 && (
                  <button 
                    onClick={() => toast.info("Please use the connect button in the header")}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/10 transition-all"
                  >
                    Waiting for Wallet...
                  </button>
                )}
              </motion.div>

              {/* Step 2: Minting */}
              <motion.div 
                key="step2"
                className={`p-4 rounded-2xl border transition-all ${step >= 2 ? 'border-lolcat-pink/20 bg-lolcat-pink/5' : 'border-white/5 opacity-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-lolcat-pink font-mono">02.</span>
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Protocol Allocation</span>
                  </div>
                  {step > 2 ? <CheckCircle2 size={14} className="text-lolcat-pink" /> : step < 2 ? <Lock size={12} className="text-zinc-700" /> : <Rocket size={14} className="text-lolcat-pink animate-bounce" />}
                </div>
                {step === 2 && (
                  <TransactionButton
                    transaction={() => {
                      toast.loading("Initiating transaction...");
                      return claimTo({
                        contract: nftContract,
                        to: account?.address || "",
                        tokenId: 0n,
                        quantity: 1n,
                      });
                    }}
                    onTransactionConfirmed={() => {
                      toast.success("Protocol Accepted: NFT Minted!");
                      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f2ff', '#ff69b4'] });
                    }}
                    onError={(err) => toast.error(`Error: ${err.message}`)}
                    className="!w-full !bg-gradient-to-r !from-lolcat-pink !to-lolcat-purple !text-white !font-black !py-4 !rounded-xl !text-xs !uppercase !tracking-[0.2em] !shadow-neon-pink transition-all active:scale-95"
                  >
                    EXECUTE MINT
                  </TransactionButton>
                )}
              </motion.div>

              {/* Step 3: Verification */}
              <motion.div 
                key="step3"
                className={`p-4 rounded-2xl border transition-all ${step >= 3 ? 'border-lolcat-purple/20 bg-lolcat-purple/5' : 'border-white/5 opacity-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-lolcat-purple font-mono">03.</span>
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Distribution Status</span>
                  </div>
                  {step < 3 ? <Lock size={12} className="text-zinc-700" /> : <CheckCircle2 size={14} className="text-matrix-blue" />}
                </div>
                {step === 3 && (
                  <div className="flex flex-col gap-2">
                    <div className="bg-matrix-blue/10 border border-matrix-blue/20 p-3 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-matrix-blue flex items-center justify-center shadow-neon-blue">
                        <CheckCircle2 size={16} className="text-black" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase">Assets Secured</p>
                        <p className="text-[8px] font-bold text-matrix-blue uppercase tracking-widest">Ownership Confirmed</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={shareToWarpcast} className="bg-white text-black font-black py-3 rounded-xl text-[9px] uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg">
                        <Share2 size={12} /> Share
                      </button>
                      <a href={`https://basescan.org/address/0xba968fA5d5255d6D95bD23D69bA63De13ceFF731`} target="_blank" className="bg-white/5 border border-white/10 text-white font-black py-3 rounded-xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                        <ExternalLink size={12} /> Explorer
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Technical Metadata Footer */}
          <footer className="pt-4 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-zinc-600">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              <span>MAINNET SYNCHRONIZED</span>
            </div>
            <span className="opacity-60">BUILD: V1.2.0-STABLE</span>
          </footer>
        </div>

        <p className="text-center mt-6 text-[9px] text-white/10 font-mono uppercase tracking-[0.8em]">
          MRxLOLCAT PROPRIETARY
        </p>
      </motion.div>
    </main>
  );
}
