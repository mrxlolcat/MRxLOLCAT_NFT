'use client';
import { useReadContract } from "thirdweb/react";
import { nftContract } from "@/lib/thirdweb-client";

export function SupplyCounter() {
  const { data: totalSupply, isLoading } = useReadContract({
    contract: nftContract,
    method: "function totalSupply() view returns (uint256)",
    params: [],
  });

  return (
    <div className="bg-white/5 border border-lolcat-pink/20 p-4 rounded-2xl text-center backdrop-blur-sm">
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">Live Supply</p>
      <p className="text-2xl font-black text-lolcat-pink glow-pink tracking-tight">
        {isLoading ? "..." : (totalSupply?.toString() || "0")} <span className="text-sm opacity-30 font-normal">/ 10,000</span>
      </p>
    </div>
  );
}
