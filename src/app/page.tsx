'use client';
import { 
  ConnectButton, 
  darkTheme, 
  useActiveAccount,
  useReadContract 
} from "thirdweb/react";
import { client, nftContract } from "@/lib/thirdweb-client";
import { base } from "thirdweb/chains";
import { SupplyCounter } from "@/components/SupplyCounter";
import { MintButton } from "@/components/MintButton";
import { ClaimTokenButton } from "@/components/ClaimTokenButton";
import Image from "next/image";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const account = useActiveAccount();
  const [step, setStep] = useState(1);

  // Check if already minted to progress step (Simplified for UI flow)
  const { data: balance } = useReadContract({
    contract: nftContract,
    method: "function balanceOf(address, uint256) view returns (uint256)",
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative matrix-bg">
        {/* Neon Ambient Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-matrix-blue/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lolcat-purple/10 blur-[120px] rounded-full pointer-events-none" />

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[450px] relative z-10"
          >
            {/* Main Premium Card */}
            <div className="glass-card rounded-[32px] p-6 shadow-glass flex flex-col gap-6 overflow-hidden">
              
              {/* Electric Blue Matrix Hero */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-matrix-blue/30 group bg-matrix-dark">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <Image 
                  src="https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg"
                  alt="MRxLOLCAT Matrix"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 animate-float mix-blend-screen"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matrix-dark via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="bg-matrix-blue text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-neon-blue">Matrix Protocol</span>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-matrix-blue font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse-glow">
                  <ShieldCheck size={12} /> System Authenticated
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter leading-none text-white uppercase">
                  MRx<span className="text-matrix-blue">LOLCAT</span>
                </h1>
                <p className="text-zinc-500 text-xs font-medium">Sequential Genesis Protocol • Base Mainnet</p>
              </div>

              <SupplyCounter />

              {/* Sequential Flow Steps */}
              <div className="flex flex-col gap-4">
                
                {/* STEP 1: Connect */}
                <div className={`p-4 rounded-2xl border transition-all ${step >= 1 ? 'border-matrix-blue/20 bg-matrix-blue/5' : 'border-white/5 opacity-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-matrix-blue tracking-widest uppercase">01. Authorization</span>
                    {step > 1 ? <CheckCircle2 size={16} className="text-matrix-blue" /> : null}
                  </div>
                  <ConnectButton 
                    client={client}
                    chain={base}
                    theme={darkTheme({ 
                      colors: { accentText: "#00f2ff", accentButtonBg: "#00f2ff", modalBg: "#050505" } 
                    })}
                    connectButton={{ 
                      className: "!w-full !py-3 !rounded-xl !bg-white/5 !text-white !font-black !border !border-white/10 !text-sm hover:!bg-white/10 transition-all shine-sweep lift-hover",
                      label: "CONNECT WALLET"
                    }}
                  />
                </div>

                {/* STEP 2: Mint */}
                <div className={`p-4 rounded-2xl border transition-all ${step >= 2 ? 'border-lolcat-pink/20 bg-lolcat-pink/5' : 'border-white/5 opacity-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-lolcat-pink tracking-widest uppercase">02. Genesis Mint</span>
                    {step > 2 ? <CheckCircle2 size={16} className="text-lolcat-pink" /> : step < 2 ? <Lock size={14} className="text-zinc-600" /> : null}
                  </div>
                  <MintButton disabled={step !== 2} />
                </div>

                {/* STEP 3: Claim */}
                <div className={`p-4 rounded-2xl border transition-all ${step >= 3 ? 'border-lolcat-purple/20 bg-lolcat-purple/5' : 'border-white/5 opacity-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-lolcat-purple tracking-widest uppercase">03. Asset Distribution</span>
                    {step < 3 ? <Lock size={14} className="text-zinc-600" /> : null}
                  </div>
                  <ClaimTokenButton disabled={step !== 3} />
                </div>

              </div>

              {/* Footer technical data */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-zinc-600">
                <span>PROTOCOL: V1.0.5</span>
                <span className="text-matrix-blue opacity-60 uppercase">Base ID: 8453</span>
              </div>
            </div>

            <p className="text-center mt-6 text-[10px] text-white/20 font-mono uppercase tracking-[0.5em]">
              Executed by MRxLOLCAT
            </p>
          </motion.div>
        </AnimatePresence>
      </main>
  );
}
