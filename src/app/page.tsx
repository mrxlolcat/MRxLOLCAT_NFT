'use client';
import { ThirdwebProvider, ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "@/lib/thirdweb-client";
import { base } from "thirdweb/chains";
import { SupplyCounter } from "@/components/SupplyCounter";
import { MintButton } from "@/components/MintButton";
import { ClaimTokenButton } from "@/components/ClaimTokenButton";
import Image from "next/image";
import { ShieldCheck, Info } from "lucide-react";

export default function Home() {
  return (
    <ThirdwebProvider>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
        {/* Animated Background Gradients */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lolcat-pink/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-lolcat-purple/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none" />

        <div className="w-full max-w-[450px] relative z-10">
          {/* Main Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-[32px] shadow-glass-multi flex flex-col gap-6">
            
            {/* Hero Image Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-lolcat-pink/30 group">
              <Image 
                src="https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg"
                alt="MRxLOLCAT Hero"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 animate-float"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="bg-lolcat-pink text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-neon-pink">Base Mainnet</span>
              </div>
            </div>

            {/* Title & Badge */}
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-lolcat-purple font-mono text-[10px] uppercase tracking-[0.3em]">
                <ShieldCheck size={12} /> Verified Genesis
              </div>
              <h1 className="text-4xl font-black italic tracking-tighter leading-none glow-pink text-lolcat-pink uppercase">
                MRx<span className="text-white">LOLCAT</span>
              </h1>
              <p className="text-gray-500 text-xs font-medium">Join the elite circle. Unlock the cyberpunk future.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <SupplyCounter />
              <div className="bg-white/5 border border-lolcat-purple/20 p-4 rounded-2xl text-center backdrop-blur-sm">
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">Price</p>
                <p className="text-2xl font-black text-lolcat-purple glow-purple tracking-tight uppercase">Free</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <ConnectButton 
                client={client}
                chain={base}
                theme={darkTheme({ 
                  colors: { 
                    accentText: "#ff69b4", 
                    accentButtonBg: "#ff69b4",
                    modalBg: "#0a0a0a",
                    borderColor: "#ffffff1a"
                  } 
                })}
                connectButton={{ 
                  className: "!w-full !py-3 !rounded-xl !bg-white/5 !text-white !font-black !border !border-white/10 !text-sm hover:!bg-white/10 transition-all",
                  label: "CONNECT WALLET"
                }}
              />
              <MintButton />
              <ClaimTokenButton />
            </div>

            {/* Contract Info */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-[9px] text-gray-600 font-mono">
                <Info size={10} /> 0x3525fDbC54DC01121C8e12C3948187E6153Cdf25
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <p className="text-center mt-6 text-[10px] text-white/20 font-mono uppercase tracking-[0.5em]">
            Built with love by MRxLOLCAT
          </p>
        </div>
      </main>
    </ThirdwebProvider>
  );
}
