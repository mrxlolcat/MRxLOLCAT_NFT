'use client';
import { useReadContract } from "thirdweb/react";
import { nftContract } from "@/lib/thirdweb-client";

export function SupplyCounter() {
  const { data: totalSupply, isLoading } = useReadContract({
    contract: nftContract,
    method: "function totalSupply(uint256) view returns (uint256)",
    params: [0n],
  });

  return (
    <div className="bg-matrix-blue/5 border border-matrix-blue/20 p-4 rounded-2xl text-center backdrop-blur-sm">
      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-1">Asset Supply Status</p>
      <p className="text-2xl font-black text-matrix-blue tracking-tight glow-blue">
        {isLoading ? "SCANNIG..." : (totalSupply?.toString() || "0")} <span className="text-xs opacity-30 font-normal">/ 10,000</span>
      </p>
    </div>
  );
}
