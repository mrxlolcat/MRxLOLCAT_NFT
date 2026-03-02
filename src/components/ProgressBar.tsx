'use client';

import { useReadContract } from "thirdweb/react";
import { nftContract } from "@/lib/thirdweb";

export default function ProgressBar() {
  const { data: totalSupply } = useReadContract({
    contract: nftContract,
    method: "function totalSupply(uint256 id) view returns (uint256)",
    params: [0n],
  });

  const total = 6969;
  const current = totalSupply ? Number(totalSupply) : 0;
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full max-w-xl mx-auto px-4 mb-12">
      <div className="flex justify-between items-end mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{current.toLocaleString()} of {total.toLocaleString()} Minted</span>
        <span className="text-xs font-black text-white italic">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
        <div 
          className="h-full bg-gradient-to-r from-white via-accent to-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,105,180,0.3)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
