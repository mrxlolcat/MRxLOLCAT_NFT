'use client';
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc20";
import { tokenContract } from "@/lib/thirdweb-client";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export function ClaimTokenButton({ disabled }: { disabled?: boolean }) {
  const account = useActiveAccount();

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className="w-full"
    >
      <TransactionButton
        transaction={() => claimTo({
          contract: tokenContract,
          to: account?.address || "",
          quantity: "1000",
        })}
        onTransactionConfirmed={() => {
          confetti({ 
            particleCount: 200, 
            spread: 100, 
            origin: { y: 0.6 },
            colors: ['#9370db', '#ff69b4', '#00f2ff']
          });
          alert("🎁 1000 LOLCAT Tokens Claimed!");
        }}
        disabled={disabled}
        className={`!w-full !py-4 !rounded-2xl !font-black !text-lg transition-all ${
          disabled 
          ? "!bg-zinc-800 !text-zinc-500 !cursor-not-allowed" 
          : "!bg-transparent !border-2 !border-lolcat-purple !text-lolcat-purple !shadow-neon-purple hover:!bg-lolcat-purple/10"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={20} fill={disabled ? "none" : "currentColor"} />
          CLAIM 1000 LOLCAT
        </div>
      </TransactionButton>
    </motion.div>
  );
}
