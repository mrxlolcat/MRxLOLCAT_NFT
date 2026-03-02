'use client';

import { useReadContract } from "thirdweb/react";
import { nftContract } from "@/lib/thirdweb";

export default function StatsRow() {
  const { data: totalSupply } = useReadContract({
    contract: nftContract,
    method: "function totalSupply(uint256 id) view returns (uint256)",
    params: [0n],
  });

  const stats = [
    { label: "Total Supply", value: "6,969" },
    { label: "Minted", value: totalSupply?.toString() || "..." },
    { label: "Price", value: "FREE", color: "text-[#00c851]" },
    { label: "Chain", value: "Base" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto px-4 mb-12">
      {stats.map((stat, i) => (
        <div key={i} className="glass-card rounded-2xl p-5 text-center flex flex-col gap-1 border border-white/5">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{stat.label}</span>
          <span className={`text-xl font-black italic tracking-tighter uppercase ${stat.color || "text-white"}`}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
