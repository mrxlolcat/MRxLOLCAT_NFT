'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Terminal, Cat, Zap, Share2 } from 'lucide-react';
import { useActiveAccount, useReadContract, TransactionButton } from 'thirdweb/react';
import { claimTo } from "thirdweb/extensions/erc1155";
import { nftContract } from "@/lib/thirdweb-client";
import { WalletConnector } from "@/components/WalletConnector";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import sdk from "@farcaster/frame-sdk";

export default function MainApp() {
  const account = useActiveAccount();
  const [isFrame, setIsFrame] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        if (typeof window !== "undefined" && sdk && typeof sdk.context !== 'undefined') {
          const appCtx = await sdk.context;
          if (appCtx) {
            setContext(appCtx);
            setIsFrame(true);
          }
          if (sdk.actions && typeof sdk.actions.ready === 'function') {
            sdk.actions.ready();
          }
        }
      } catch (error) {
        console.warn("Farcaster SDK init skipped");
      }
    };
    initApp();
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

  const handleShare = () => {
    const text = "Just secured my MRxLOLCAT Genesis Pass! 🐱🚀";
    const url = "https://mrxlolcat-nft.vercel.app/";
    try {
      if (sdk && sdk.actions && typeof sdk.actions.openUrl === 'function') {
        sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`);
      } else {
        window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`, "_blank");
      }
    } catch (e) {
      window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`, "_blank");
    }
  };

  const handleExplorer = () => {
    const url = `https://basescan.org/address/0xba968fA5d5255d6D95bD23D69bA63De13ceFF731`;
    try {
      if (sdk && sdk.actions && typeof sdk.actions.openUrl === 'function') {
        sdk.actions.openUrl(url);
      } else {
        window.open(url, "_blank");
      }
    } catch (e) {
      window.open(url, "_blank");
    }
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#050505] cyber-grid-v2 ${isFrame ? 'pt-safe pb-safe' : ''}`}>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00f2ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ff0080]/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px] relative z-10">
        <div className="rounded-[48px] p-[2px] bg-gradient-to-br from-[#00f2ff] via-white/10 to-[#ff0080] shadow-2xl">
          <div className="rounded-[46px] p-8 flex flex-col gap-6 bg-[#0a0a0a]/95 backdrop-blur-3xl relative overflow-hidden">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                <Cat size={14} className="text-[#00f2ff]" />
                <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">
                  {context?.user?.username ? `@${context.user.username}` : 'GUEST_MODE'}
                </span>
              </div>
              <WalletConnector />
            </div>

            <header className="text-center space-y-1">
              <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-white">
                MRx<span className="text-[#00f2ff]">LOL</span>CAT
              </h1>
              <p className="text-[10px] font-bold text-[#ff0080] tracking-[0.6em] uppercase">Vibe Portal</p>
            </header>

            <div className="relative aspect-square w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img src="https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg" alt="NFT" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="px-2 py-0.5 bg-white text-black text-[8px] font-black rounded uppercase mb-2 inline-block">Official Collection</span>
                <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter block">Genesis Pass</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-3xl bg-white/5 border border-white/5 text-center">
                <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Supplied</p>
                <p className="text-2xl font-black text-white">{totalSupply?.toString() || "0"}</p>
              </div>
              <div className="p-4 rounded-3xl bg-white/5 border border-white/5 text-center">
                <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Price</p>
                <p className="text-2xl font-black text-[#00f2ff]">FREE</p>
              </div>
            </div>

            <div className="space-y-4">
              {balance && balance > 0n ? (
                <div className="space-y-3">
                  <div className="p-5 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                    <CheckCircle2 className="text-emerald-400" size={24} />
                    <p className="text-[11px] font-black text-white uppercase">Verified Ownership</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleExplorer} className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-2xl text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-white/10">
                      <Terminal size={14} /> Explorer
                    </button>
                    <button onClick={handleShare} className="w-full bg-[#00f2ff] text-black font-black py-4 rounded-2xl text-[10px] uppercase flex items-center justify-center gap-2 hover:opacity-90">
                      <Share2 size={14} /> Share
                    </button>
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
                    confetti();
                    toast.success("Mint Success!");
                  }}
                  onError={(err) => toast.error("Error: " + err.message)}
                  className="!w-full !bg-white !text-black !font-black !py-6 !rounded-[28px] !text-sm !uppercase !shadow-2xl"
                >
                  MINT NFT
                </TransactionButton>
              ) : (
                <div className="p-8 rounded-[40px] bg-white/5 border border-dashed border-white/10 text-center">
                  <Zap className="mx-auto text-[#00f2ff] mb-3 animate-pulse" size={32} />
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-5">Access Required</p>
                  <div className="flex justify-center scale-110"><WalletConnector /></div>
                </div>
              )}
            </div>

            <footer className="pt-2 opacity-20">
              <p className="text-[10px] font-black tracking-[0.6em] uppercase text-white text-center">MRxLOLCAT ONLY</p>
            </footer>

          </div>
        </div>
      </motion.div>
    </main>
  );
}
