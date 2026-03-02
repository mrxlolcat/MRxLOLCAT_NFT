'use client';

import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 border-t border-white/5 bg-black/40 backdrop-blur-md text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
          <ShieldCheck size={16} />
          <a 
            href="https://basescan.org/address/0xba968fA5d5255d6D95bD23D69bA63De13ceFF731" 
            target="_blank" 
            className="text-[10px] font-mono tracking-tighter"
          >
            0xba968fA5d5255d6D95bD23D69bA63De13ceFF731
          </a>
        </div>
        
        <p className="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">
          Powered by <span className="text-white">Thirdweb</span> & <span className="text-[#0052FF]">Base</span>
        </p>
        
        <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-4">
          © 2026 MRxLOLCAT Genesis Protocol. Built for the Onchain Future.
        </p>
      </div>
    </footer>
  );
}
