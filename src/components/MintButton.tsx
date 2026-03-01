'use client';
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc1155";
import { nftContract } from "@/lib/thirdweb-client";
import { Rocket } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export function MintButton({ disabled, onSuccess }: { disabled?: boolean, onSuccess?: () => void }) {
  const account = useActiveAccount();

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className="w-full"
    >
      <TransactionButton
        transaction={() => claimTo({
          contract: nftContract,
          to: account?.address || "",
          tokenId: 0n,
          quantity: 1n,
        })}
        onTransactionConfirmed={() => {
          confetti({ 
            particleCount: 150, 
            spread: 70, 
            origin: { y: 0.6 },
            colors: ['#ff69b4', '#9370db', '#00f2ff']
          });
          onSuccess?.();
          alert("NFT Minted! Welcome to MRxLOLCAT.");
        }}
        disabled={disabled}
        className={`!w-full !py-4 !rounded-2xl !font-black !text-lg transition-all ${
          disabled 
          ? "!bg-zinc-800 !text-zinc-500 !cursor-not-allowed" 
          : "!bg-gradient-to-r !from-lolcat-pink !to-lolcat-purple !text-white !shadow-neon-pink"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Rocket size={20} fill={disabled ? "none" : "currentColor"} />
          MINT NFT
        </div>
      </TransactionButton>
    </motion.div>
  );
}
