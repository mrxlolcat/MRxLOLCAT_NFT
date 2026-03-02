'use client';

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative w-full py-12 px-4 sm:px-6 lg:px-8">
      {/* Banner Gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0a0a0a] border-b border-white/5 -z-10" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Collection Avatar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-32 h-32 rounded-full border-4 border-[#111111] overflow-hidden shadow-2xl mb-6 bg-surface"
        >
          <img 
            src="https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg" 
            alt="MRxLOLCAT"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black italic tracking-tighter uppercase text-white mb-2"
        >
          MRxLOLCAT
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-500 font-bold tracking-widest uppercase text-xs mb-8"
        >
          Genesis Collection on Base Mainnet
        </motion.p>
      </div>
    </div>
  );
}
