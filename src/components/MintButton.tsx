'use client';
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { nftContract } from "@/lib/thirdweb-client";
import { Rocket } from "lucide-react";
import confetti from "canvas-confetti";

export function MintButton() {
  const account = useActiveAccount();

  return (
    <TransactionButton
      transaction={() => claimTo({
        contract: nftContract,
        to: account?.address || "",
        quantity: 1n,
      })}
      onTransactionConfirmed={() => {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        alert("✨ NFT Minted! Welcome to MRxLOLCAT.");
      }}
      onError={(err) => alert("❌ Mint Error: " + err.message)}
      className="!bg-lolcat-pink !text-black !font-black !w-full !py-4 !rounded-2xl !text-lg !shadow-neon-pink hover:!scale-[1.02] active:!scale-[0.98] transition-all shine-sweep"
    >
      <div className="flex items-center justify-center gap-2">
        <Rocket size={20} fill="currentColor" />
        MINT NFT GRATIS
      </div>
    </TransactionButton>
  );
}
