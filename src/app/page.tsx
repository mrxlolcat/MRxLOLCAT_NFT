'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ShieldCheck, Rocket, CheckCircle2, Share2, Wallet, Lock, ExternalLink, Loader2
} from 'lucide-react';
import { 
  useActiveAccount, 
  useReadContract,
  TransactionButton,
  NFTProvider,
  NFTMedia,
  NFTName,
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
    const duration = 1500;
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

export default function MRxLOLCATBaseApp() {
  const account = useActiveAccount();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: totalSupply, isLoading: loadingSupply } = useReadContract({
    contract: nftContract,
    method: "function totalSupply(uint256 id) view returns (uint256)",
    params: [0n],
  });

  const { data: balance } = useReadContract({
    contract: nftContract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000", 0n],
  });

  useEffect(() => {
    if (!account) setStep(1);
    else if (balance && balance > 0n) setStep(3);
    else setStep(2);
  }, [account, balance]);

  const shareToWarpcast = () => {
    const text = `I just secured my MRxLOLCAT Genesis Pass on Base! Join the collection at @mrxlolcat`;
    const url = "https://mrxlolcat-nft.vercel.app";
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`;
    window.open(castUrl, "_blank");
  };

  if (!mounted) return <main className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-matrix-blue" /></main>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative mesh-bg">
      <Toaster position="top-center" richColors theme="dark" />
      
      {/* Decorative Grid Overlay */}
      <div className="fixed inset-0 matrix-bg opacity-30 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
        <div className="glass-card neon-glow-card rounded-[40px] p-8 flex flex-col gap-8 shadow-2xl">
          
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-matrix-blue to-lolcat-purple rounded-2xl flex items-center justify-center shadow-lg shadow-matrix-blue/20">
                <Zap size={20} className="text-black" fill="currentColor" />
              </div>
              <div>
                <h1 className="font-black text-lg tracking-tight text-white leading-none">MRxLOLCAT</h1>
                <p className="text-[8px] font-black text-matrix-blue tracking-[0.3em] mt-1 uppercase">Protocol Live</p>
              </div>
            </div>
            <div className="scale-90 origin-right">
              <WalletConnector />
            </div>
          </header>

          <NFTProvider contract={nftContract} tokenId={0n}>
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden border-2 border-white/10 group bg-black/20 shadow-inner">
              <NFTMedia className="object-cover w-full h-full animate-float-slow transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-matrix-blue/90 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-neon-blue">Verified Collection</span>
                </div>
                <NFTName className="text-3xl font-black italic uppercase text-white tracking-tighter glow-blue" />
              </div>
            </div>
          </NFTProvider>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 border border-white/5 rounded-[24px] p-5 backdrop-blur-md">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-mono">Current Supply</p>
              <p className="text-2xl font-black text-white">
                {loadingSupply ? "..." : <><AnimatedCounter value={Number(totalSupply || 0)} /> <span className="text-xs opacity-20 font-normal">/ 10,000</span></>}
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-[24px] p-5 backdrop-blur-md text-center">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-mono">Price Status</p>
              <p className="text-2xl font-black text-matrix-blue uppercase glow-blue">FREE</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                  <div className="p-6 rounded-[24px] bg-white/5 border border-matrix-blue/30 text-center space-y-4">
                    <Wallet className="mx-auto text-matrix-blue opacity-50" size={32} />
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-relaxed">Secure protocol authorization required to participate.</p>
                    <button onClick={() => toast.info("Connect using the top-right button")} className="w-full py-4 rounded-2xl bg-matrix-blue text-black font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all">Initialize Connection</button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <TransactionButton
                    transaction={() => {
                      toast.loading("Broadcasting to Base Mainnet...");
                      return claimTo({ contract: nftContract, to: account?.address || "", tokenId: 0n, quantity: 1n });
                    }}
                    onTransactionConfirmed={() => {
                      toast.success("Transaction Confirmed!");
                      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f2ff', '#ff69b4', '#9370db'] });
                    }}
                    onError={(err) => toast.error(`Reverted: ${err.message}`)}
                    className="!w-full !bg-gradient-to-r !from-matrix-blue !to-lolcat-purple !text-black !font-black !py-6 !rounded-[24px] !text-sm !uppercase !tracking-[0.2em] !shadow-neon-blue transition-all active:scale-95"
                  >
                    MINT GENESIS PASS
                  </TransactionButton>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="flex flex-col gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-[24px] flex items-center gap-4">
                      <CheckCircle2 className="text-emerald-400" size={28} />
                      <div>
                        <p className="font-black text-sm text-white uppercase italic tracking-tight">Access Verified</p>
                        <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Asset successfully secured on Base</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={shareToWarpcast} className="bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg flex items-center justify-center gap-2">
                        <Share2 size={14} /> Share Access
                      </button>
                      <a href={`https://basescan.org/address/0xba968fA5d5255d6D95bD23D69bA63De13ceFF731`} target="_blank" className="bg-white/5 border border-white/10 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10">
                        <ExternalLink size={14} /> Explorer
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <footer className="pt-6 border-t border-white/5 flex flex-col items-center gap-2 opacity-40">
            <div className="flex items-center gap-2 text-[9px] font-mono text-matrix-blue tracking-tighter uppercase">
              <ShieldCheck size={12} /> Encrypted Session • Base Mainnet
            </div>
            <p className="text-[8px] font-black tracking-[0.6em] text-white/50">MRxLOLCAT PROTOCOL</p>
          </footer>
        </div>
      </motion.div>
    </main>
  );
}
