'use client';

import { motion } from "framer-motion";

export default function NFTCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-[400px] mx-auto glass-card rounded-[32px] overflow-hidden shadow-2xl mb-12 border border-white/5 group"
    >
      <div className="relative aspect-square overflow-hidden bg-black">
        <img 
          src="https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg" 
          alt="NFT Featured"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-[10px] font-black tracking-widest text-white uppercase italic">Genesis</span>
        </div>
      </div>
      
      <div className="p-8 text-left space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[#888888] font-bold text-[10px] uppercase tracking-widest">MRxLOLCAT Collection</span>
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Genesis Pass #0</h2>
        <p className="text-zinc-500 text-xs font-medium leading-relaxed">
          Access the primary protocol gateway for the MRxLOLCAT ecosystem. High-fidelity utility asset on the Base network.
        </p>
        
        <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/5 mt-4">
          <div>
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Standard</p>
            <p className="text-xs font-bold text-white uppercase italic">ERC-1155</p>
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Protocol</p>
            <p className="text-xs font-bold text-white uppercase italic">MRx_GEN_0</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
