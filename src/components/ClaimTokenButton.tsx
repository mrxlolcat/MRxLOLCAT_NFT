'use client';
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc20";
import { tokenContract } from "@/lib/thirdweb-client";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function ClaimTokenButton() {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => claimTo({
        contract: tokenContract,
        to: account?.address || "",
        quantity: "1000",
      })}
      onTransactionConfirmed={() => {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        alert("🎁 1000 LOLCAT Tokens Claimed!");
      }}
      onError={(err) => alert("❌ Claim failed: " + err.message)}
      className="!bg-transparent !border-2 !border-lolcat-purple !text-lolcat-purple !font-black !w-full !py-4 !rounded-2xl !text-lg !shadow-neon-purple hover:!bg-lolcat-purple/10 transition-all shine-sweep"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkles size={20} fill="currentColor" />
        CLAIM 1000 LOLCAT
      </div>
    </TransactionButton>
  );
}
