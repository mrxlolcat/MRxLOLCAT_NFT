'use client';

import { useState } from "react";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";
import { nftContract } from "@/lib/thirdweb";
import { Minus, Plus, Rocket } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function MintSection() {
  const [quantity, setQuantity] = useState(1);
  const account = useActiveAccount();

  const increase = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrease = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-md mx-auto space-y-6 px-4 mb-20">
      <div className="flex flex-col gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between glass-card p-2 rounded-2xl border border-white/5">
          <button onClick={decrease} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors text-zinc-400">
            <Minus size={20} />
          </button>
          <span className="text-xl font-black italic">{quantity}</span>
          <button onClick={increase} className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors text-zinc-400">
            <Plus size={20} />
          </button>
        </div>

        {/* Mint Button */}
        <TransactionButton
          transaction={() => claimTo({
            contract: nftContract,
            to: account?.address || "0x0000000000000000000000000000000000000000",
            tokenId: 0n,
            quantity: BigInt(quantity),
          })}
          onTransactionConfirmed={() => {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            toast.success("Mint Successful!");
          }}
          onError={(err) => toast.error(`Error: ${err.message}`)}
          className="!w-full !h-16 !btn-primary !rounded-2xl !text-lg !shadow-2xl !shadow-white/10"
        >
          <div className="flex items-center gap-3">
            <Rocket size={20} className="animate-bounce" />
            <span>Mint Now (Free)</span>
          </div>
        </TransactionButton>
        
        <p className="text-[10px] text-zinc-500 font-bold text-center uppercase tracking-[0.2em]">Limit 10 per transaction</p>
      </div>
    </div>
  );
}
